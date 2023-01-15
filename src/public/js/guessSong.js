const app = angular.module("myApp", ['ui.grid', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.grid.autoResize',
    'ui.grid.moveColumns', "ui.grid.pagination", 'ui.grid.pinning']);
// , 'ngTouch', 'ngAria', 'ngMaterial', 'ngMessages', 'ngAnimate'

app.controller("Ctrl", function ($scope, $http, $filter, uiGridConstants) {
    $scope.lang = 'zh-tw';

    $scope.gridOptions = {
        paginationPageSizes: [10, 30, 50, 100],
        paginationPageSize: 10,
        enableSorting: true, // 排序
        enableFiltering: true, // 篩選
        enableGridMenu: true, // Grid選單選項
        enableColumnResizing: true, // 調整欄位大小
        enablePinning: true, // 固定最左或最右
        enableRowSelection: true, // Row能否被勾選
        enableRowHeaderSelection: false, // 點Row就選整條
        multiSelect: false, // 多選
        noUnselect: true, // 能否不選
        minimumColumnSize: 100, // 欄位最小寬度
        rowHeight: 50,
        data: [],
        columnDefs: [
            {
                field: 'songTitle',
                displayName: '歌曲名稱',
                // pinnedLeft: true,
                headerCellClass: 'text-center',
                cellTemplate:
                    `<div class="ui-grid-cell-contents">
                        <a href="{{row.entity.ytLink}}" target="_blank">{{COL_FIELD}}</a>
                    </div>`
            },
            {
                field: 'theme',
                displayName: '戲劇/電影',
                headerCellClass: 'text-center'
            },
            {
                field: 'singerName',
                displayName: '歌手',
                headerCellClass: 'text-center',
                width: 120
            },
            {
                field: 'gender',
                displayName: '種類',
                filter: {
                    type: uiGridConstants.filter.SELECT,
                    selectOptions: [
                        { value: '男', label: '男' },
                        { value: '女', label: '女' },
                        { value: '團體', label: '團體' },
                        { value: '合唱', label: '合唱' }
                    ]
                },
                headerCellClass: 'text-center',
                width: 85,
                cellClass: 'text-center'
            },
            {
                field: 'songLanguage',
                displayName: '語系',
                filter: {
                    type: uiGridConstants.filter.SELECT,
                    selectOptions: [
                        { value: '華', label: '華' },
                        { value: '台', label: '台' },
                        { value: '韓', label: '韓' },
                        { value: '英', label: '英' },
                        { value: '日', label: '日' },
                        { value: '粵', label: '粵' }
                    ]
                },
                headerCellClass: 'text-center',
                width: 85,
                cellClass: 'text-center'
            },
            {
                field: 'intro',
                displayName: '前奏',
                enableFiltering: false,
                headerCellClass: 'text-center',
                width: 200,
                cellTemplate: 'gridCellParagraphHtml/intro'
            },
            {
                field: 'verse',
                displayName: '主歌',
                enableFiltering: false,
                headerCellClass: 'text-center',
                width: 200,
                cellTemplate: 'gridCellParagraphHtml/verse'
            },
            {
                field: 'preChorus',
                displayName: '導歌',
                enableFiltering: false,
                headerCellClass: 'text-center',
                width: 200,
                cellTemplate: 'gridCellParagraphHtml/preChorus'
            },
            {
                field: 'chorus',
                displayName: '副歌',
                enableFiltering: false,
                headerCellClass: 'text-center',
                width: 200,
                cellTemplate: 'gridCellParagraphHtml/chorus'
            },
            {
                field: 'bridge',
                displayName: 'Bridge',
                enableFiltering: false,
                headerCellClass: 'text-center',
                width: 200,
                cellTemplate: 'gridCellParagraphHtml/bridge'
            },
            {
                field: 'outro',
                displayName: '尾奏',
                enableFiltering: false,
                headerCellClass: 'text-center',
                width: 200,
                cellTemplate: 'gridCellParagraphHtml/outro'
            },
            {
                field: '_id',
                displayName: '刪除歌曲',
                enableFiltering: false,
                headerCellClass: 'text-center',
                width: 120,
                cellClass: 'text-center',
                cellTemplate:
                    `<div class="ui-grid-cell-contents gridFlex">
                        <button type="button" class="btn btn-danger" ng-click='grid.appScope.applyDeleteSong(row)' style="width: 100px;">刪除</button>
                    </div>`
            },

        ],
        onRegisterApi: function (gridApi) {
            $scope.UIgridApi = gridApi;
        }
    };
    $scope.init = function () {
        readSongAllApi()
            .then(res => {
                $scope.gridOptions.data = res.data.data;
                $scope.UIgridApi.core.refresh(); // 重整Grid資料
            })
    };

    $scope.applyDeleteSong = function (row) {
        const _id = row.entity._id;
        if (confirm("刪除後無法復原，確定要刪除嗎？")) {
            applyDeleteSongApi({ _id: _id })
                .then(res => {
                    if (res.data.code === 0) {
                        location.reload();
                        return alert("刪除成功！")
                    } else {
                        return alert(res.data.msg)
                    }
                })
        } else {
            return alert("不刪還按，調皮(◔⊖◔)つ")
        }
    }

    // 試聽Grid裡的歌
    $scope.auditionGrid = function (row, paragraph) {
        const ytID = row.entity.ytID
        const audioURL = `/guessSong/getSong/${ytID}/${paragraph}`
        let html = `
            <audio controls autoplay>
                <source src="${audioURL}" type="audio/mp3">
                Your browser does not support the audio element.
            </audio>`
        $("audio").remove();
        $(".playerGrid").append(html)
    }
});

// 取所有input及select的values
function getVal() {
    const getVal = {};
    const $inputs = $(".form-control,.form-select");
    $inputs.each(function (index) {
        if (this.value && this.value !== "") {
            if (this.id.includes("Start")) {
                getVal[this.id.split("Start")[0]] = {
                    begin: this.value
                };
            } else if (this.id.includes("End")) {
                const paragraphKey = this.id.split("End")[0];
                if (!getVal[paragraphKey]) {
                    return alert("要輸入開始時間啦！");
                }
                getVal[paragraphKey].end = this.value;
            } else {
                getVal[this.id] = this.value;
            }
        }
    });
    return getVal;
}

// 檢查YT網址
$("#ytLink").blur(async function () {
    let ytLink = $('#ytLink').val()
    if (ytLink) {
        await readSongByytIDApi({ ytLink: ytLink })
            .then(res => {
                if (res.data.code !== 0 && ytLink) {
                    return alert(res.data.msg)
                }
            });
    }
});

// 檢查歌手名稱+歌曲名稱
$("#singerName, #songTitle").blur(async function () {
    if ($("#singerName").val() && $("#songTitle").val()) {
        await axios.get("/guessSong/read", {
            params: {
                singerName: $("#singerName").val(),
                songTitle: $("#songTitle").val()
            }
        }).then(res => {
            if (res.data.code !== 0 && $("#singerName, #songTitle").val()) {
                $("#singerName, #songTitle").val("")
                return alert(res.data.msg)
            }
        });
    }
});

// 取資料建立試聽
async function createSong() {
    loading_div_open()
    let songVal = await getVal();
    if (!songVal.ytLink || !songVal.songTitle || !songVal.singerName || !songVal.gender || !songVal.songLanguage ||
        !songVal.verse || !songVal.chorus) {
        loading_div_close()
        return alert("有必填欄位沒填哦！")
    } else {
        await createSongApi(songVal)
            .then(res => {
                if (res.data.code === 0) {
                    $("#createSongModel").hide();
                    $("#ytID").val(res.data.data);
                    $("#staticBackdrop").modal("show");
                    $("#auditionBtn").show();
                    $(".modal-title").append(songVal.songTitle);
                    songVal.intro ? $(".btnIntro").removeAttr("disabled") : $(".btnIntro").attr("disabled");
                    songVal.verse ? $(".btnVerse").removeAttr("disabled") : $(".btnVerse").attr("disabled");
                    songVal.preChorus ? $(".btnPreChorus").removeAttr("disabled") : $(".btnPreChorus").attr("disabled");
                    songVal.chorus ? $(".btnChorus").removeAttr("disabled") : $(".btnChorus").attr("disabled");
                    songVal.bridge ? $(".btnBridge").removeAttr("disabled") : $(".btnBridge").attr("disabled");
                    songVal.outro ? $(".btnOutro").removeAttr("disabled") : $(".btnOutro").attr("disabled");
                } else {
                    return alert(res.data.msg)
                }
            })
    }
    loading_div_close()
};

// 取ytID刪除暫存檔
async function auditionDelete() {
    let ytID = $("#ytID").val();
    if (confirm("確定要刪除嗎？")) {
        if (!ytID) {
            return alert("無YoutubeID，無法刪除")
        } else {
            await auditionDeleteApi({ ytID: ytID })
                .then(res => {
                    if (res.data.code === 0) {
                        window.location.reload();
                        return alert("刪除成功！")
                    } else {
                        return alert(res.data.msg)
                    }
                })
        }
    }
}

// 試聽
function audition(type) {
    let paragraph = type;
    let ytID = $("#ytID").val();
    const audioURL = `/guessSong/sample?ytID=${ytID}&paragraph=${paragraph}&fileFormat=mp3`
    let html = `
        <audio controls autoplay>
            <source src="${audioURL}" type="audio/mp3">
            Your browser does not support the audio element.
        </audio>`
    $("audio").remove();
    $(".player").append(html)
}

// 將試聽後歌曲送入DB
async function applyAddSong() {
    let ytID = $("#ytID").val()
    if (!ytID) {
        return alert("此試聽歌曲沒有在暫存列表中哦！")
    } else {
        await applyAddSongApi({ ytID: ytID })
            .then(res => {
                if (res.data.code === 0) {
                    window.location.reload();
                    return alert("正式歌曲新增成功！")
                } else {
                    return alert(res.data.msg)
                }
            })
    }
}

// 測試資料
function testValues() {
    $("#ytLink").val("https://www.youtube.com/watch?v=LRZVjXje1Hk");
    $("#songTitle").val("閣愛妳一擺");
    $("#singerName").val("茄子蛋");
    $("#gender").val("團體");
    $("#songLanguage").val("台");
    $("#introStart").val("00:00");
    $("#introEnd").val("00:35");
    $("#verseStart").val("00:36");
    $("#verseEnd").val("01:04");
    $("#preChorusStart").val("01:05");
    $("#preChorusEnd").val("01:21");
    $("#chorusStart").val("01:22");
    $("#chorusEnd").val("01:49");
    $("#outroStart").val("03:49");
    $("#outroEnd").val("04:36");
}