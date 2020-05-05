// pages/index/index.js
let util = require('../../utils/util')
let types = ["1","41","10","29","31"];
let allMaxtime = 0;//全部 最大时间
let videoMaxtime = 0;//视频 最大时间
let pictureMaxtime = 0;//图片 最大时间
let textMaxtime = 0;//段子 最大时间
let voiceMaxtime = 0;//声音 最大时间
const DATATYPE = {
  ALLDATATYPE : "1",
  VIDEODATATYPE : "41",
  PICTUREDATATYPE : "10",
  TEXTDATATYPE : "29",
  VOICEDATATYPE : "31"
};
let page = 1;
// 1->全部;41->视频;10->图片;29->段子;31->声音;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topTabItems:["全部","视频","图片","段子","声音"],
    currentTopItem: 0,
    allDataList:[],//全部数据
    videoDataList:[],//视频数据
    pictureDataList:[],//图片数据
    textDataList:[],//段子
    voiceDataList:[],//声音
    swiperHeight:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refreshNewData();
  },
  //刷新数据
  refreshNewData(){
    util.ShowLoading();
    let parameters = 'a=list&c=data&type='+types[this.data.currentTopItem];
    let that = this;
    util.request(parameters,(res)=>{
      page=1;
      this.setNewDataWithRes(res,that)
      setTimeout(()=>{
        util.hideToast();
        wx.stopPullDownRefresh()
      },1000)
    })
  },
  // 加载更多操作
  loadMoreData(){
    util.ShowLoading();
    let that = this;
    let parameters = `a=list&c=data&type=${types[this.data.currentTopItem]}&page=${page+1}&maxtime=`+this.getMaxtime()
    util.request(parameters,(res)=>{
      page += 1;
      that.setMoreDataWithRes(res,that);
      setTimeout(function(){
        util.hideToast();
        wx.stopPullDownRefresh();
      },1000);
    })
  },
  // 设置新数据
  setNewDataWithRes(res,that){
    switch (types[this.data.currentTopItem]) {
      //全部
      case DATATYPE.ALLDATATYPE:
        allMaxtime = res.data.info.maxtime
        that.setData({
          allDataList:res.data.list
        })
        break;
        case DATATYPE.VIDEODATATYPE:
        allMaxtime = res.data.info.maxtime
        that.setData({
          videoDataList:res.data.list
        })
        break;
        case DATATYPE.PICTUREDATATYPE:
        allMaxtime = res.data.info.maxtime
        that.setData({
          pictureDataList:res.data.list
        })
        break;
        case DATATYPE.TEXTDATATYPE:
        allMaxtime = res.data.info.maxtime
        that.setData({
          textDataList:res.data.list
        })
        break;
        case DATATYPE.VOICEDATATYPE:
        allMaxtime = res.data.info.maxtime
        that.setData({
          voiceDataList:res.data.list
        })
        break;
    
      default:
        break;
    }
  },
  // swiper切换
  bindChange(e){
    console.log(e);
    this.setData({
      currentTopItem:e.detail.current
    })
    if (this.needLoad()) {
      this.refreshNewData()
    }
  },
  // 监听点击
  switchTab(e){
    this.setData({
      currentTopItem:e.currentTarget.dataset.idx
    })
    if (this.needLoad()) {
      this.refreshNewData()
    }
  },
  // 获取最大时间
  getMaxtime(){
    switch (types[this.data.currentTopItem]) {
      // 全部
      case DATATYPE.ALLDATATYPE:
        return allMaxtime;
        break;
    
      default:
        break;
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getSystemInfo({
      success: (result) => {
        console.log(result);
        this.setData({
          swiperHeight:(result.windowHeight-37)
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  // 设置加载更多的数据
  setMoreDataWithRes(res,target){
    switch (types[this.data.currentTopItem]) {
      case DATATYPE.ALLDATATYPE:
        allMaxtime = res.data.info.maxtime;
        target.setData({
          allDataList: target.data.allDataList.concat(res.data.list)
        });
        break;
      case DATATYPE.ALLDATATYPE:
        allMaxtime = res.data.info.maxtime;
        target.setData({
          videoDataList: target.data.allDataList.concat(res.data.list)
        });
        break;
      case DATATYPE.ALLDATATYPE:
        allMaxtime = res.data.info.maxtime;
        target.setData({
          pictureDataList: target.data.allDataList.concat(res.data.list)
        });
        break;
      case DATATYPE.ALLDATATYPE:
        allMaxtime = res.data.info.maxtime;
        target.setData({
          textDataList: target.data.allDataList.concat(res.data.list)
        });
        break;
      case DATATYPE.ALLDATATYPE:
        allMaxtime = res.data.info.maxtime;
        target.setData({
          voiceDataList: target.data.allDataList.concat(res.data.list)
        });
        break;
      default:
        break;
    }
  },
  // 滚动后需不需要加载数据
  needLoad(){
    switch (types[this.data.currentTopItem]) {
      // 全部
      case DATATYPE.ALLDATATYPE:
        return this.data.allDataList.length > 0 ? false : true;
      // 视频
      case DATATYPE.VIDEODATATYPE:
        return this.data.videoDataList.length > 0 ? false : true;
      // 图片
      case DATATYPE.PICTUREDATATYPE:
        return this.data.pictureDataList.length > 0 ? false : true;
      // 段子
      case DATATYPE.TEXTDATATYPE:
        return this.data.textDataList.length > 0 ? false : true;
      // 声音
      case DATATYPE.VOICEDATATYPE:
        return this.data.voiceDataList.length > 0 ? false : true;
      default:
        break;
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})