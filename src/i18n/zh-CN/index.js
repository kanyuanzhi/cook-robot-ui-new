// Usage: 用于中文简体的国际化
export default {
  common: {
    confirm: "确认",
    save: "保存",
    cancel: "取消",
    reset: "恢复",
    delete: "删除",
    clear: "清空",
    submit: "提交",
    create: "新建",
    updateSuccess: "更新成功",
    updateFailed: "更新失败",

    createSuccess: "创建成功",
    createFailed: "创建失败",

    deleteSuccess: "删除成功",
    deleteFailed: "删除失败",

    deleteConfirmMsg: "确认删除？",

    operateConfirmMsg: "确认操作",

    caesuraSign: "、",

    executeSuccessMsg: "执行成功",

    "湘菜": "湘菜",
    "川菜": "川菜",
    "粤菜": "粤菜",
    "鲁菜": "鲁菜",
    "苏菜": "苏菜",
    "闽菜": "闽菜",
    "浙菜": "浙菜",
    "徽菜": "徽菜",
    "其他": "其他",

    space: "",
  },
  home: {
    base: {
      title: "主页",
      dish: "菜品选择",
      dishSummary: "多种菜品任你选择",
      reaction: "人机互动",
      reactionSummary: "多种互动任你选择",
      shop: "商城选购",
      shopSummary: "多种商品任你选择",
    },
  },
  footer: {
    status: {
      ing: "中",
      waiting: "待机等待",
      pauseToAdd: {
        moving: "中途加料：移动至加料位中",
        permit: "中途加料：现在可以加料",
        resetting: "中途加料：恢复原位置中",
      },
      firing: "炒制",
      washing: "清洗中",
      pouring: "倒水中",
      resetting: "复位中",
      preparing: "备菜中",
      dishOuting: "出菜中",
      withdrawing: "收纳中",
      err: "状态错误",
    },
  },
  header: {
    back: "返回",
    search: "搜索",
    dishSync: "菜品同步",
    withdraw: "一键收纳",
    moreOptions: {
      qrScan: "扫码炒菜",
      dishSelect: "菜品选择",
      dishCook: "菜品制作",
      systemSettings: "系统设置",
    },
    qrScan: {
      instruction: "请将二维码对准扫码器",
      dishNotFound: "未查询到对应菜品，请重试",
      wrongQr: "非小云智炒二维码",
    },
    searchDish: "搜索菜品",
  },
  dishSelect: {
    base: {
      title: "菜品选择",
      allDish: "全部",
      officialDish: "官方菜品",
      personalDish: "我的菜品",
    },
  },
  dishEdit: {
    base: {
      title: "菜品制作",
    },
    stepList: {
      title: "步骤",
    },
    operatorBtns: {
      title: "操作",
      ingredient: "食材",
      seasoning: "调料",
      fire: "火力",
      stirFry: "翻炒",
      water: "纯净水",
      oil: "食用油",
    },
    ingredientDialog: {
      title: "添加食材",
      ingredient: "食材",
      shape: "形状",
      weight: "分量",
      unit: "克",
      slot: "菜盒",
      nameSelect: {
        title: "选择食材",
      },
      shapeSelect: {
        title: "选择食材形状",
      },
    },
    seasoningDialog: {
      title: "添加调料",
      add: "添加新调料",
      maxWarningMsg: "同时添加调料数量不能超过5个",
      minWarningMsg: "至少添加1种调料",
    },
    fireDialog: {
      title: "添加火力",
      heatingTemperature: "加热温度",
      unit: "摄氏度（℃）",
      judgeType: "控制方式",
      instruction: "控制加热达到以下设定温度后，继续下一步骤，选择无则加热后直接开始下一步骤",
      targetTemperature: "温度监测",
      judgeTypeOption: {
        noJudge: "无",
        targetJudge: "温度",
      },
    },
    stirFryDialog: {
      title: "添加翻炒",
      gear: "档位",
    },
    waterDialog: {
      title: "添加纯净水",
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
      dishName: "名称",
      cuisine: "菜系",
      note: "保存操作将会重置该菜品已有的三种自定义口味",
      emptyNameMsg: "请输入菜品名称",
    },
    select: {
      duration: {
        title: "时间控制",
        min: "分",
        sec: "秒",
      },
      seasoning: {
        title: "种类",
      },
    },
    seasoningItem: {
      label: "分量",
      unit: "克",
    },
  },
  controlDialog: {
    title: "运行控制",
    selectDish: "请选择菜品",

    bottomTemperature: "锅底温度",
    infraredTemperature: "红外温度",
    inPotTemperature: "锅内温度",

    heatControl: "加热控制",

    shutdown: "终止",
    pauseToAdd: "中途加料",
    resume: "继续炒制",
    doorUnlock: "开门",
    prepare: "备菜",
    wash: "清洗",
    dishOut: "出菜",

    washing: "清洗中",
    unselectDish: "未选择菜品",
    pausing: "暂停中，已用时",

    seasoningInsufficientWaringMsg: "不足，请确认是否继续炒制？",
    seasoningInsufficientPrompt: "不足，请添加！",
    dishOutWarningMsg: "出菜过程中，锅体会倾斜向下倒出菜品，是否确认执行？",
    shutdownWarningMsg: "确认终止炒制？",
    changeTemperatureWarningMsg: "未在炒制菜品不允许调整温度",

    heatingTemperature: "加热温度",

    taste: "口味",
  },
  systemSettings: {
    base: {
      title: "系统设置",
      pumpSetting: {
        label: "料泵设置",
        summary: "各泵开启时长（毫秒）与出料分量（克）的比例关系。例：100表示下料1克需要开启泵100毫秒。",
      },
      networkConnect: {
        label: "网络连接",
      },
      phonePair: {
        label: "手机配对",
        summary: "请打开手机App扫描以下二维码完成配对。",
      },
      dataUpdate: {
        label: "菜品同步",
      },
      softwareUpdate: {
        label: "软件更新",
      },
      languageShift: {
        label: "语言切换",
      },
    },
    pumpSetting: {
      green: "“绿色”",
      red: "“红色”",
      sufficientText: "标签表示调料充足，",
      insufficientText: "标签表示调料不足。",

      pump: "号泵",
      ratioWrongMsg: "比例不能小于0",
    },
    networkConnect: {
      open: "WLAN开",
      close: "WLAN关",
      hiddenNet: "隐藏的网络",
      isSaved: "（已保存）",
      getStatusWrongMsg: "获取wlan状态错误",
      systemWrongMsg: "当前平台不为linux下的electron，不支持控制WLAN的开启/关闭",
      scanWrongMsg: "扫描wifi失败",
      loadingMsg: "连接中，请稍后...",
      validateWrongMsg: "验证信息错误，请重新输入",
      closeConnectSuccessMsg: "断开连接成功",
      closeConnectWrongMsg: "断开连接失败",
      forgetConnectSuccessMsg: "忘记连接成功",
      forgetConnectWrongMsg: "忘记连接失败",
      connectSuccessMsg: "连接成功",

      authorityPassword: "安全密钥",
      authorityName: "网络名称",
      inputAuthorityPassword: "请输入网络安全密钥",
      inputAuthorityNameAndPassword: "请输入网络名称与安全密钥",

      chooseOperation: "请选择操作",
      closeConnect: "断开连接",
      forgetConnect: "忘记连接",
    },
    phonePair: {
      pairFailMsg: "获取二维码失败，请将设备连接wifi，并保证手机与设备在同一wifi下",
    },
    dataUpdate: {
      officialDishNumber: "官方菜品数量：",
      personalDishNumber: "我的菜品数量：",
      syncDish: "同步菜品",
      syncing: "同步中，请稍后...",
      syncFinished: "同步完成",

      officialDish: "官方菜品：",
      personalDish: "我的菜品：",

      update: "更新",
      delete: "删除",
      add: "添加",
      unit: "个，",
      localAdd: "本地新增",
      remoteAdd: "远程新增",
    },
    softwareUpdate: {
      name: "软件名称：",
      version: "软件版本：",
      model: "设备型号：",
      serialNumber: "设备序列号：",
      updateTime: "更新日期：",

      checkUpdate: "检查更新",
      startUpdate: "开始更新",

      noNeedUpdateMsg: "当前已是最新版本，无需更新",
      preparingMsg: "正在准备更新包，请稍后重试",
      hasNewVersionMsg: "有新版本",
      permitUpdateMsg: "可以更新，请点击下方“开始更新”按钮",
      checkUpdateFailedMsg: "检查更新失败",
      isRunningMsg: "机器运行中，请稍后更新",

      downloadSpeed: "下载速度：",
      downloadProgress: "下载进度：",
      installProgress: "安装进度：",
      reboot: "退出重启",
      updating: "正在更新",

      websocketEstablishedMsg: "WebSocket连接已建立",
      websocketFailedMsg: "WebSocket错误",
      websocketClosedMsg: "WebSocket连接已关闭",
      notSupportMsg: "非electron平台无法重启软件",
    },
    language: {
      selectLanguage: "选择语言",
    },
  },

  command: {
    pauseToAddWarningMsg: "为确保安全，请在机器运行至翻炒位时中途加料",
    nameErrorMsg: "命令名称错误",
  },

  dishDetails: {
    slot: "菜仓",
    seasoning: "调料：",
    original: "原味",
    taste: "口味",

    dishEdit: "大厨编辑",
    startCook: "开始炒制",
    tasteCustomization: "口味调整",

    cookingWarningMsg: "当前有菜品正在炒制，请稍后",
    add: "添加",
    unit: "克",

    tasteCustomizationDialog: {
      title: "口味调整（单位：克）",
    },

    tasteModificationPanel: {
      th: "第",
      addSeasoning: "次加料",
    },

    tasteWeightInput: {
      minWarningMsg: "调料分量不能小于0",
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
    slot: "号菜盒",
    addAtLeastOneSeasoningMsg: "至少添加1种调料",

    watchBottomTemperature: "持续监测锅底温度至",
    watchTemperature: "持续监测温度至",
    watchInfraredTemperature: "持续监测红外温度至",
    last: "持续",
    second: "秒",
    noTemperatureWatch: "无温度监测",
    temperatureJudgeError: "温度控制方式错误",
    heat: "加热",

    stirFry: "翻炒",
    stirFryLink: "档，持续",

    addWater: "添加纯净水",
    kilogram: "克",

    addOil: "添加食用油",
    space: "",
  },
};
