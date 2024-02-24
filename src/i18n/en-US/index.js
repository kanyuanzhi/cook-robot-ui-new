// Usage: 用于中文简体的国际化
export default {
  common: {
    confirm: "Confirm",
    save: "Save",
    cancel: "Cancel",
    reset: "Reset",
    delete: "Delete",
    clear: "Clear",
    submit: "Submit",
    create: "Create",
    updateSuccess: "Update Successfully",
    updateFailed: "Update Failed",

    createSuccess: "Create Successfully",
    createFailed: "Create Failed",

    deleteSuccess: "Delete Successfully",
    deleteFailed: "Delete Failed",

    deleteConfirmMsg: "Confirm The Deletion",

    operateConfirmMsg: "Confirm The Operation",

    caesuraSign: "/",

    executeSuccessMsg: "Execute Successfully",

    "湘菜": "Hu Nan",
    "川菜": "Si Chuan",
    "粤菜": "Guang Dong",
    "鲁菜": "Shan Dong",
    "苏菜": "Jiang Su",
    "闽菜": "Fu Jian",
    "浙菜": "Zhe Jiang",
    "徽菜": "An Hui",
    "其他": "Others",
    space: " ",
  },
  home: {
    base: {
      title: "Home",
      dish: "Dishes Choose",
      dishSummary: "More Dishes",
      reaction: "Human-computer Interaction",
      reactionSummary: "More Interaction",
      shop: "Shop",
      shopSummary: "More Merchandise",
    },
  },
  footer: {
    status: {
      ing: "",
      waiting: "Waiting",
      pauseToAdd: {
        moving: "Add Seasoning Halfway Through: Waiting",
        permit: "Add Seasoning Halfway Through: In progress",
        resetting: "Add Seasoning Halfway Through: Ending",
      },
      firing: "Cooking ",
      washing: "Washing",
      pouring: "Pouring",
      resetting: "Resetting",
      preparing: "Preparing Dishes",
      dishOuting: "Dish Outing",
      withdrawing: "With Drawing",
      err: "Error",
    },
  },
  header: {
    back: "Back",
    search: "Search",
    dishSync: "	Dish Sync",
    withdraw: "Withdraw",
    moreOptions: {
      qrScan: "Scan Code",
      dishSelect: "Dish Select",
      dishCook: "Dish Edit",
      systemSettings: "System Settings",
    },
    qrScan: {
      instruction: "Point The QR Code At The Reader",
      dishNotFound: "please try again",
      wrongQr: "QR Code Error",
    },
    searchDish: "Search Dishes",
  },
  dishSelect: {
    base: {
      title: "Dish Select",
      allDish: "All",
      officialDish: "XiaoZhi",
      personalDish: "Personal",
    },
  },
  dishEdit: {
    base: {
      title: "Dish Edit",
    },
    stepList: {
      title: "Step",
    },
    operatorBtns: {
      title: "Operation",
      ingredient: "Food",
      seasoning: "Season",
      fire: "Fire",
      stirFry: "StirFry",
      water: "Water",
      oil: "Oil",
    },
    ingredientDialog: {
      title: "Add Ingredients",
      ingredient: "Ingredients",
      shape: "Shape",
      weight: "Weight",
      unit: "g",
      slot: "Vegetable Box",
      nameSelect: {
        title: "Ingredients Select",
      },
      shapeSelect: {
        title: "Shape",
      },
    },
    seasoningDialog: {
      title: "Add Seasoning",
      add: "Add New Seasoning",
      maxWarningMsg: "Up to five",
      minWarningMsg: "At least one",
    },
    fireDialog: {
      title: "Fire",
      heatingTemperature: "Heating Temperature",
      unit: "℃",
      judgeType: "Control Mode",
      instruction: "keep heating to the set temperature before move on to next step; choose none to directly go to next step after heating.",
      targetTemperature: "Temperature Monitoring",
      judgeTypeOption: {
        noJudge: "None",
        targetJudge: "Temperature",
      },
    },
    stirFryDialog: {
      title: "Add stir fry",
      gear: "Gear",
    },
    waterDialog: {
      title: "Add Water",
      weight: "Weight",
      unit: "g",
    },
    oilDialog: {
      title: "Add Oil",
      weight: "Weight",
      unit: "g",
    },
    saveDishDialog: {
      title: "Save",
      dishName: "Name",
      cuisine: "Cuisine",
      note: "The save operation will reset the three custom flavors that exist in the dish",
      emptyNameMsg: "Please enter a name",
    },
    select: {
      duration: {
        title: "Time Control",
        min: "minute",
        sec: "second",
      },
      seasoning: {
        title: "type",
      },
    },
    seasoningItem: {
      label: "Weight",
      unit: "g",
    },
  },
  controlDialog: {
    title: "Running Control",
    selectDish: "Choose Dish",

    bottomTemperature: "Bottom Temperature",
    infraredTemperature: "Infrared Temperature",
    inPotTemperature: "Pot Temperature",

    heatControl: "HeatingControl",

    shutdown: "End",
    pauseToAdd: "Add",
    resume: "Continue",
    doorUnlock: "Unlock",
    prepare: "Prepare",
    wash: "Wash",
    dishOut: "Dish Out",

    washing: "Washing",
    unselectDish: "Unselect Dish",
    pausing: "pausing",

    seasoningInsufficientWaringMsg: "insufficient, still continue?",
    seasoningInsufficientPrompt: "Insufficient, please add！",
    dishOutWarningMsg: "Please confirm",
    shutdownWarningMsg: "Please confirm",
    changeTemperatureWarningMsg: "Temperature adjustment is currently prohibited",

    heatingTemperature: "Heating Temperature",
    taste: "TASTE ",
  },
  systemSettings: {
    base: {
      title: "System Settings",
      pumpSetting: {
        label: "Pump Settings",
        summary: "Scale relationship: Parameter 100 means 100ms for 1g。",
      },
      networkConnect: {
        label: "Network Connection",
      },
      phonePair: {
        label: "Phone Pair",
        summary: "Please use phone to scan QR code。",
      },
      dataUpdate: {
        label: "Dish Sync",
      },
      softwareUpdate: {
        label: "Software Update",
      },
      languageShift: {
        label: "Language",
      },
    },
    pumpSetting: {
      green: "\"Green\"",
      red: "\"Red\"",
      sufficientText: " is sufficient, ",
      insufficientText: " is insufficient.",

      pump: " Pump",
      ratioWrongMsg: "The ratio cannot be less than 0",
    },
    networkConnect: {
      open: "WLAN ON",
      close: "WLAN OFF",
      hiddenNet: "Hidden network",
      isSaved: "(Saved)",
      getStatusWrongMsg: "Obtaining WLAN Status Error",
      systemWrongMsg: "The current platform is not electron under Linux, cannot control the enablement or disabling of WLAN",
      scanWrongMsg: "Failed to scan wifi",
      loadingMsg: "Connecting, please wait...",
      validateWrongMsg: "The verification information is incorrect, please re-enter it",
      closeConnectSuccessMsg: "The disconnection is successful",
      closeConnectWrongMsg: "Disconnection failed",
      forgetConnectSuccessMsg: "Forgot  connection was successfully",
      forgetConnectWrongMsg: "Forgot connection failed",
      connectSuccessMsg: "The connection is successful",

      authorityPassword: "Security keys",
      authorityName: "Network name",
      inputAuthorityPassword: "Please enter your network security key",
      inputAuthorityNameAndPassword: "Enter the network name and security key",

      chooseOperation: "Please select an action",
      closeConnect: "Disconnect",
      forgetConnect: "Forget connect",
    },
    phonePair: {
      pairFailMsg: "if you fail to get the QR code, please connect the device to the same WiFi as your phone.",
    },
    dataUpdate: {
      officialDishNumber: "Official dishes: ",
      personalDishNumber: "Personal dishes: ",
      syncDish: "Start Sync",
      syncing: "Syncing...",
      syncFinished: "Sync finished",

      officialDish: "Official dishes: ",
      personalDish: "Personal dishes: ",

      update: "Update ",
      delete: "Delete ",
      add: "Add ",
      unit: ", ",
      localAdd: "Locally Add ",
      remoteAdd: "Remotely add ",
    },
    softwareUpdate: {
      name: "Name: ",
      version: "Version: ",
      model: "Model: ",
      serialNumber: "Serial number: ",
      updateTime: "Update time: ",

      checkUpdate: "CHECK UPDATE",
      startUpdate: "START UPDATE",

      noNeedUpdateMsg: "It is currently the latest version and does not need to be updated",
      preparingMsg: "Preparing to update the package, please try again later",
      hasNewVersionMsg: "There is a new version",
      permitUpdateMsg: "Please click the 'START UPDATE' button below",
      checkUpdateFailedMsg: "Check failed",
      isRunningMsg: "The machine is running, please update later",

      downloadSpeed: "Download speed: ",
      downloadProgress: "Download progress: ",
      installProgress: "Installation progress: ",
      reboot: "Reboot",
      updating: "Updating",

      websocketEstablishedMsg: "A WebSocket connection has been established",
      websocketFailedMsg: "WebSocket error",
      websocketClosedMsg: "The WebSocket connection is closed",
      notSupportMsg: "Non Electron platforms cannot restart software",
    },
    language: {
      selectLanguage: "Language",
    },
  },

  command: {
    pauseToAddWarningMsg: "To ensure safety, please run the machine to the stir-fry position before executing",
    nameErrorMsg: "Name Error",
  },

  dishDetails: {
    slot: "Box ",
    seasoning: "Seasoning: ",
    original: "Original",
    taste: "Taste",

    dishEdit: "Edit",
    startCook: "Start Cook",
    tasteCustomization: " Taste",

    cookingWarningMsg: "There are currently dishes stir-fried, please wait",
    add: "Add ",
    unit: "g",

    tasteCustomizationDialog: {
      title: " Taste Customize(g)",
    },

    tasteModificationPanel: {
      th: "",
      addSeasoning: "",
    },

    tasteWeightInput: {
      minWarningMsg: "The amount of seasoning should not be less than 0",
    },

    displayFormat: {
      unit: "g",
      comma: "，",
    },

    successMsg: "Operate Successfully",
  },
  newStep: {
    add: "add ",
    ingredientLink: "g, use ",
    slot: " box",
    addAtLeastOneSeasoningMsg: "Add at least one seasoning",

    watchBottomTemperature: "Continuously monitor the temperature at the bottom of the pot to ",
    watchTemperature: "Continuously monitor temperature to",
    watchInfraredTemperature: "Continuously monitor infrared temperature to ",
    last: "last ",
    second: "s",
    noTemperatureWatch: "No temperature monitoring",
    temperatureJudgeError: "Temperature control method error",
    heat: "Heat ",

    stirFry: "stir-fry ",
    stirFryLink: " Gear, last ",

    addWater: "add water ",
    kilogram: "g",

    addOil: "add oil ",
    space: " ",
  },
};
