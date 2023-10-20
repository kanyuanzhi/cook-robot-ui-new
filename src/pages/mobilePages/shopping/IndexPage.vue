<template>
  <div>
    <q-card class="my-card" flat v-for="info in infoList" :key="info.desc1">
      <q-card-section horizontal>
        <q-img class="col-5" :src="info.imgUrl" height="140px" />
        <q-card-section class="card-sec">
          <div class="desc1">{{ info.desc1 }}</div>
          <div class="desc2"> {{ info.desc2 }}</div>
          <div class="desc3">无理由退换</div>
          <span class="comment">{{ info.comment }}</span>
          <div class="btn-wrap">
            <div class="price">{{ info.price }}</div>
            <q-btn color="red" text-color="white" label="加入购物车" />
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>


  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const infoList = [{
  desc1: '30枚/份，农家谷物草鸡蛋',
  desc2: '附近100+人购买',
  price: '￥19.99',
  comment: '“价格合理，我已经第二次买了”',
  imgUrl: '/public/imgs/pic1.jpg'
}, {
  desc1: '500g/盒，新鲜现宰土猪肉后腿上肉',
  desc2: '附近50+人购买',
  price: '￥26.99',
  comment: '“真的很划算”',
  imgUrl: '/public/imgs/pic2.jpg'
}, {
  desc1: '新鲜蒜米500g，金乡优选 大蒜',
  desc2: '附近200+人购买',
  price: '￥9.99',
  comment: '“品质很好”',
  imgUrl: '/public/imgs/pic3.jpg'
}, {
  desc1: '精品大土豆4斤，单果四两起 新鲜黄皮大土豆',
  desc2: '附近500+人购买',
  price: '￥6.99',
  comment: '“分量很足”',
  imgUrl: '/public/imgs/pic4.jpg'
}, {
  desc1: '500g/盒，新鲜直供 甄选优品西红柿',
  desc2: '附近1000+人购买',
  price: '￥8.99',
  imgUrl: '/public/imgs/pic5.jpg'
}, {
  desc1: '3斤一袋，水果黄瓜',
  desc2: '附近100+人购买',
  price: '￥5.99',
  comment: '“真的很划算，已经回购多次”',
  imgUrl: '/public/imgs/pic6.jpg'
},]

</script>

<style lang="scss" scoped>
.my-card {
  height: 150px;
  margin: 5px;
}

.card-sec {
  margin-left: 10px;
  padding: 5px;
  width: 195px;
}

.desc1 {
  color: #333;
  margin-bottom: 5px;
}

.desc2 {
  color: gray;
  font-size: 12px;
}

.desc3 {
  color: green;
  font-size: 12px;
}

.btn-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}

.price {
  color: red;
}

.comment {
  font-size: 12px;
  background-color: lightyellow;
  color: orange;
}
</style>
