// Usage:用於中文簡體的國際化
export default {
  common: {
    confirm: "確認",
    save: "保存",
    cancel: "取消",
    reset: "恢復",
    delete: "删除",
    clear: "清空",
    submit: "提交",
    create: "新建",
    updateSuccess: "更新成功",
    updateFailed: "更新失敗",
    createSuccess: "創建成功",
    createFailed: "創建失敗",
    deleteSuccess: "删除成功",
    deleteFailed: "删除失敗",
    deleteConfirmMsg: "確認删除？",
    operateConfirmMsg: "確認操作",
    caesuraSign: "、",
    executeSuccessMsg: "執行成功",
    "湘菜": "湘菜",
    "川菜": "川菜",
    "粤菜": "粵菜",
    "鲁菜": "魯菜",
    "苏菜": "蘇菜",
    "闽菜": "閩菜",
    "浙菜": "浙菜",
    "徽菜": "徽菜",
    "其他": "其他",
    space: "",
  },
  home: {
    base: {
      title: "主頁",
      dish: "菜品選擇",
      dishSummary: "多種菜品任你選擇",
      reaction: "人機互動",
      reactionSummary: "多種互動任你選擇",
      shop: "商城選購",
      shopSummary: "多種商品任你選擇",
    },
  },
  footer: {
    status: {
      ing: "中",
      waiting: "待機等待",
      pauseToAdd: {
        moving: "中途加料：移動至加料比特中",
        permit: "中途加料：現在可以加料",
        resetting: "中途加料：恢復原位置中",
      },
      firing: "炒制",
      washing: "清洗中",
      pouring: "倒水中",
      resetting: "復位中",
      preparing: "備菜中",
      dishOuting: "出菜中",
      withdrawing: "收納中",
      err: "狀態錯誤",
    },
  },
  header: {
    back: "返回",
    search: "搜索",
    dishSync: "菜品同步",
    withdraw: "一鍵收納",
    moreOptions: {
      qrScan: "掃碼炒菜",
      dishSelect: "菜品選擇",
      dishCook: "菜品製作",
      systemSettings: "系統設置",
    },
    qrScan: {
      instruction: "請將二維碼對準掃碼器",
      dishNotFound: "未査詢到對應菜品，請重試",
      wrongQr: "非小雲智炒二維碼",
    },
    searchDish: "搜索菜品",
  },
  dishSelect: {
    base: {
      title: "菜品選擇",
      allDish: "全部",
      officialDish: "官方菜品",
      personalDish: "我的菜品",
    },
  },
  dishEdit: {
    base: {
      title: "菜品製作",
    },
    stepList: {
      title: "步驟",
    },
    operatorBtns: {
      title: "操作",
      ingredient: "食材",
      seasoning: "調料",
      fire: "火力",
      stirFry: "翻炒",
      water: "純淨水",
      oil: "食用油",
    },
    ingredientDialog: {
      title: "添加食材",
      ingredient: "食材",
      shape: "形狀",
      weight: "分量",
      unit: "克",
      slot: "菜盒",
      nameSelect: {
        title: "選擇食材",
      },
      shapeSelect: {
        title: "選擇食材形狀",
      },
    },
    seasoningDialog: {
      title: "添加調料",
      add: "添加新調料",
      maxWarningMsg: "同時添加調料數量不能超過5個",
      minWarningMsg: "至少添加1種調料",
    },
    fireDialog: {
      title: "添加火力",
      heatingTemperature: "加熱溫度",
      unit: "攝氏度（℃）",
      judgeType: "控制管道",
      instruction: "控制加熱達到以下設定溫度後，繼續下一步驟，選擇無則加熱後直接開始下一步驟",
      targetTemperature: "溫度監測",
      judgeTypeOption: {
        noJudge: "無",
        targetJudge: "溫度",
      },
    },
    stirFryDialog: {
      title: "添加翻炒",
      gear: "檔位",
    },
    waterDialog: {
      title: "添加純淨水",
      weight: "分量",
      unit: "克",
    },
    oilDialog: {
      title: "添加食用油",
      weight: "分量",
      unit: "克",
    },
    saveDishDialog: {
      title: "保存菜品",
      dishName: "名稱",
      cuisine: "菜系",
      note: "保存操作將會重置該菜品已有的三種自定義口味",
      emptyNameMsg: "請輸入菜品名稱",
    },
    select: {
      duration: {
        title: "時間控制",
        min: "分",
        sec: "秒",
      },
      seasoning: {
        title: "種類",
      },
    },
    seasoningItem: {
      label: "分量",
      unit: "克",
    },
  },
  controlDialog: {
    title: "運行控制",
    selectDish: "請選擇菜品",
    bottomTemperature: "鍋底溫度",
    infraredTemperature: "紅外溫度",
    inPotTemperature: "鍋內溫度",
    heatControl: "加熱控制",
    shutdown: "終止",
    pauseToAdd: "中途加料",
    resume: "繼續炒制",
    doorUnlock: "開門",
    prepare: "備菜",
    wash: "清洗",
    dishOut: "出菜",
    washing: "清洗中",
    unselectDish: "未選擇菜品",
    pausing: "暫停中，已用時",
    seasoningInsufficientWaringMsg: "不足，請確認是否繼續炒制？",
    seasoningInsufficientPrompt: "不足，請添加！",
    dishOutWarningMsg: "出菜過程中，鍋體會傾斜向下倒出菜品，是否確認執行？",
    shutdownWarningMsg: "確認終止炒制？",
    changeTemperatureWarningMsg: "未在炒制菜品不允許調整溫度",
    heatingTemperature: "加熱溫度",
    taste: "口味",
  },
  systemSettings: {
    base: {
      title: "系統設置",
      pumpSetting: {
        label: "料泵設定",
        summary: "各泵開啟時長（毫秒）與出料分量（克）的比例關係。例：100表示下料1克需要開啟泵100毫秒。",
      },
      networkConnect: {
        label: "網絡連接",
      },
      phonePair: {
        label: "手機配對",
        summary: "請打開手機App掃描以下二維碼完成配對。",
      },
      dataUpdate: {
        label: "菜品同步",
      },
      softwareUpdate: {
        label: "軟體更新",
      },
      languageShift: {
        label: "語言切換",
      },
    },
    pumpSetting: {
      green: "“綠色”",
      red: "“紅色”",
      sufficientText: "標籤表示調料充足，",
      insufficientText: "標籤表示調料不足。",
      pump: "號泵",
      ratioWrongMsg: "比例不能小於0",
    },
    networkConnect: {
      open: "WLAN開",
      close: "WLAN關",
      hiddenNet: "隱藏的網絡",
      isSaved: "（已保存）",
      getStatusWrongMsg: "獲取wlan狀態錯誤",
      systemWrongMsg: "當前平臺不為linux下的electron，不支持控制WLAN的開啟/關閉",
      scanWrongMsg: "掃描wifi失敗",
      loadingMsg: "連接中，請稍後…",
      validateWrongMsg: "驗證資訊錯誤，請重新輸入",
      closeConnectSuccessMsg: "斷開連接成功",
      closeConnectWrongMsg: "斷開連接失敗",
      forgetConnectSuccessMsg: "忘記連接成功",
      forgetConnectWrongMsg: "忘記連接失敗",
      connectSuccessMsg: "連接成功",
      authorityPassword: "安全金鑰",
      authorityName: "網絡名稱",
      inputAuthorityPassword: "請輸入網路安全金鑰",
      inputAuthorityNameAndPassword: "請輸入網絡名稱與安全金鑰",
      chooseOperation: "請選擇操作",
      closeConnect: "斷開連接",
      forgetConnect: "忘記連接",
    },
    phonePair: {
      pairFailMsg: "獲取二維碼失敗，請將設備連接wifi，並保證手機與設備在同一wifi下",
    },
    dataUpdate: {
      officialDishNumber: "官方菜品數量：",
      personalDishNumber: "我的菜品數量：",
      syncDish: "同步菜品",
      syncing: "同步中，請稍後…",
      syncFinished: "同步完成",
      officialDish: "官方菜品：",
      personalDish: "我的菜品：",
      update: "更新",
      delete: "删除",
      add: "添加",
      unit: "個，",
      localAdd: "本地新增",
      remoteAdd: "遠程新增",
    },
    softwareUpdate: {
      name: "軟體名稱：",
      version: "軟體版本：",
      model: "設備型號：",
      serialNumber: "設備序號：",
      updateTime: "更新日期：",
      checkUpdate: "檢查更新",
      startUpdate: "開始更新",
      noNeedUpdateMsg: "當前已是最新版本，無需更新",
      preparingMsg: "正在準備更新包，請稍後重試",
      hasNewVersionMsg: "有新版本",
      permitUpdateMsg: "可以更新，請點擊下方“開始更新”按鈕",
      checkUpdateFailedMsg: "檢查更新失敗",
      isRunningMsg: "機器運行中，請稍後更新",
      downloadSpeed: "下載速度：",
      downloadProgress: "下載進度：",
      installProgress: "安裝進度：",
      reboot: "退出重啓",
      updating: "正在更新",
      websocketEstablishedMsg: "WebSocket連接已建立",
      websocketFailedMsg: "WebSocket錯誤",
      websocketClosedMsg: "WebSocket連接已關閉",
      notSupportMsg: "非electron平臺無法重啓軟件",
    },
    language: {
      selectLanguage: "選擇語言",
    },
  },
  command: {
    pauseToAddWarningMsg: "為確保安全，請在機器運行至翻炒比特時中途加料",
    nameErrorMsg: "命令名稱錯誤",
  },
  dishDetails: {
    slot: "菜倉",
    seasoning: "調料：",
    original: "原味",
    taste: "口味",
    dishEdit: "大廚編輯",
    startCook: "開始炒制",
    tasteCustomization: "口味調整",
    cookingWarningMsg: "當前有菜品正在炒制，請稍後",
    add: "添加",
    unit: "克",
    tasteCustomizationDialog: {
      title: "口味調整（單位：克）",
    },
    tasteModificationPanel: {
      th: "第",
      addSeasoning: "次加料",
    },
    tasteWeightInput: {
      minWarningMsg: "調料份量不能小於0",
    },
    displayFormat: {
      unit: "克",
      comma: "，",
    },
    successMsg: "操作成功",
  },
  newStep: {
    add: "添加",
    ingredientLink: "克，使用",
    slot: "號菜盒",
    addAtLeastOneSeasoningMsg: "至少添加1種調料",
    watchBottomTemperature: "持續監測鍋底溫度至",
    watchTemperature: "持續監測溫度至",
    watchInfraredTemperature: "持續監測紅外溫度至",
    last: "持續",
    second: "秒",
    noTemperatureWatch: "無溫度監測",
    temperatureJudgeError: "溫度控制方式錯誤",
    heat: "加熱",
    stirFry: "翻炒",
    stirFryLink: "檔，持續",
    addWater: "添加純淨水",
    kilogram: "克",
    addOil: "添加食用油",
    space: "",
  },
};
