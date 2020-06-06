<template>
  <div id="container"></div>
</template>

<script>
import AMap from 'AMap'
let map = ''
export default {
  name: 'deao-map',
  data () {
    return {
    }
  },
  created () {},
  mounted () {
    this.initMap()
  },
  computed: {},
  watch: {},
  methods: {
    // 地图初始化
    initMap () {
      map = new AMap.Map('container', {
        // center: [116.397428, 39.90923], // [纬度，经度]
        resizeEnable: true,
        zoom: 12
      })

      // 添加缩放按钮
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        map.addControl(new AMap.ToolBar({ position: 'RT' }))
        map.addControl(new AMap.Scale())
      })
      // 加载天气查询插件
      this.getWeather()
      // 定位
      this.getPosition()
      // 构建信息窗体中显示的内容
      // this.getInfoWindow()

      // 给多个点添加信息窗体
      this.addMaryInfoWindow()

      // 自定义的mak图标
      // this.addMarkIcon()
    },
    getWeather () {
      // 加载天气查询插件
      AMap.plugin('AMap.Weather', function () {
        // 创建天气查询实例
        var weather = new AMap.Weather()

        // 执行实时天气信息查询
        weather.getLive('深圳市', function (err, data) {
          console.log(err, data)
        })
      })
    },
    getPosition () {
      // 获取定位
      // 定位
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        })
        map.addControl(geolocation)
        geolocation.getCurrentPosition(function (status, result) {
          if (status === 'complete') {
            onComplete(result)
          } else {
            onError(result)
          }
        })

        function onComplete (data) {
          // data是具体的定位信息
          // console.log('定位', data)
        }

        function onError (data) {
          // 定位出错
          // console.log(data)
        }
      })
    },
    getInfoWindow () {
      // 信息窗体
      // 构建信息窗体中显示的内容
      var info = []
      // info.push("<div class='input-card content-window-card'><div><img style=\"float:left;width:67px;height:16px;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ")
      info.push('<div style="padding:7px 0px 0px 0px;"><h4>高德软件</h4>')
      info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>")
      info.push("<p class='input-item'>地址 :北京市朝阳区望京阜荣街10号首开广场4层</p></div></div>")

      var infoWindow = new AMap.InfoWindow({
        content: info.join('') // 使用默认信息窗体框样式，显示信息内容
      })

      infoWindow.open(map, map.getCenter())
    },
    addMaryInfoWindow () {
      // 给多个但添加信息窗体
      var lnglats = [
        [113.912103, 22.724037],
        [113.911791, 22.723444],
        [113.913508, 22.723077],
        [113.912585, 22.722949]
      ]
      var infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) })

      // 自定义mark图标
      var icon = new AMap.Icon({
        visible: true,
        size: new AMap.Size(40, 50), // 图标尺寸
        image: require('../assets/logo.png'),
        // image: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1591415415&di=957d3c5544ee62765733b6f3bb64c038&src=http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg', // Icon的图像
        imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(40, 50) // 根据所设置的大小拉伸或压缩图片
      })

      for (var i = 0; i < lnglats.length; i++) {
        var marker = new AMap.Marker({
          position: lnglats[i],
          icon: icon,
          map: map
        })
        // 信息弹窗的内容定义
        var info = []
        info.push('<div class="deao-map-wrap" style="padding:7px 0px 0px 0px;"><div class="deao-map-title">XXXX停车场 1号门</div>')
        info.push("<div class='deao-map-p'>车牌号 粤8685362</div>")
        info.push("<span class='deao-map-btn'>昼伏夜出</span></div>")

        // 使用默认信息窗体框样式，显示信息内容
        marker.content = info.join('')
        marker.on('click', markerClick)
        // 会自动触发绑定的 最后一个点的markerClick事件，信息弹窗显示
        // marker.emit('click', { target: marker })
      }
      function markerClick (e) {
        infoWindow.setContent(e.target.content)
        infoWindow.open(map, e.target.getPosition())
      }
      map.setFitView()
    },
    addMarkIcon () {
      // 自定义mark图标
      var icon = new AMap.Icon({
        size: new AMap.Size(40, 50), // 图标尺寸
        image: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1591415415&di=957d3c5544ee62765733b6f3bb64c038&src=http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg', // Icon的图像
        imageOffset: new AMap.Pixel(0, -60), // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(40, 50) // 根据所设置的大小拉伸或压缩图片
      })
      // 将 Icon 实例添加到 marker 上:
      var markerIcon = new AMap.Marker({
        position: new AMap.LngLat(113.912103, 22.724037),
        offset: new AMap.Pixel(-10, -10),
        icon: icon // 添加 Icon 实例
        // title: '北京',
        // zoom: 13
      })

      map.add(markerIcon)
    }

  }
}
</script>

<style lang='scss'>
#container {
  width:700px;
  height: 400px;
  .deao-map-wrap{
    // background: yellowgreen;
  }
  .deao-map-title{
    // color: red;
  }
  .deao-map-p{
    // color: yellow;
  }
  .deao-map-btn{
    display: inline-block;
    padding: 4px;
    color: #fff;
    background: #fd3068;
    border-radius: 2px;
  }
  .amap-icon{
    overflow:visible !important;
  }
}

</style>
