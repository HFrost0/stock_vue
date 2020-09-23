<template>
  <div>
    <el-card>
      <el-tabs class="tabs" v-model="activeName" tab-position="left" type="card" style="height: 200px;">
        <el-tab-pane name="basicIndex">
          <span slot="label"><i class="el-icon-data-line"></i> 当前行情</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="(v,k) in val_dict" :label="k" @change="checkListChange(k)"><p>{{ v }}</p></el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
        <el-tab-pane name="historyIndex">
          <span slot="label"><i class="el-icon-data-analysis"></i> 历史水平</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="(v,k) in val_level_dict" :label="k" @change="checkListChange(k)"><p>{{ v[0] }}</p>
            </el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
        <el-tab-pane name="continueIndex">
          <span slot="label"><i class="el-icon-date"></i> 连续行情</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="(v,k) in val_continue_dict" :label="k" @change="checkListChange(k)"><p>{{ v[0] }}</p>
            </el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
        <el-tab-pane name="otherIndex">
          <span slot="label"><i class="el-icon-pie-chart"></i> 其他指标</span>
<!--          <el-checkbox-group v-model="checkList">-->
<!--            <el-checkbox v-for="(v,k) in val_other_dict" :label="k" @change="checkListChange(k)"><p>{{ v[0] }}</p>-->
<!--            </el-checkbox>-->
<!--          </el-checkbox-group>-->
          <p>更新中</p>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-divider content-position="left"><i class="el-icon-star-off"></i><span class="font" style="font-size: 15px;">筛选条件</span></el-divider>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="5" align="middle" class="font">条件</el-col>
        <el-col :span="11" align="middle" class="font">条件范围</el-col>
        <el-col :span="5" align="middle" class="font">时间设置</el-col>
        <el-col :span="3" align="middle" class="font">删除</el-col>
        <el-divider content-position="left"></el-divider>
      </el-row>
      <el-row v-for="(q,i) in queries" :gutter="20">
        <el-col :span="5" align="middle">
          <p>{{ con_dict[q.con] }}{{ val_dict[q.val] }}</p>
        </el-col>
        <el-col :span="11" align="middle" class="slider">
          <el-input-number v-model="q.min" :controls="false" size="mini" :min="0" :max="q.con==='level'?1:2000"
                           :step="0.01" :precision="2" @change="numberChange(i)"></el-input-number>
          <el-slider class="slider_color" style="width: 60%; float: left;" v-model="q.value" range :min=0 :max="q.con==='level'?1:2000"
                     :step="0.01" @change="sliderChange(i)"></el-slider>
          <el-input-number v-model="q.max" :controls="false" size="mini" :min="0" :max="q.con==='level'?1:2000"
                           :step="0.01" :precision="2" @change="numberChange(i)"></el-input-number>

        </el-col>
        <el-col :span="5" v-if="q.con==='level'" align="middle" class="years">
          <span>
            <el-input-number v-model="q.mouths" :min="1" :max="24" :precision="0" size="mini"></el-input-number><span>月</span>
          </span>
        </el-col>
        <el-col :span="5" v-if="q.con==='current'" align="middle">
          <p>最新数据</p>
        </el-col>
        <el-col :span="5" v-if="q.con==='continues'" align="middle" class="years">
          <span>
            <el-input-number v-model="q.years" :min="1" :max="10" :precision="0" size="mini"></el-input-number><span>年</span>
          </span>
        </el-col>
        <el-col :span="3" align="middle">
          <el-button class="but_color" icon="el-icon-delete-solid" size="medium " @click="dropItem(i)"></el-button>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="2" :offset="19" align="right">
          <span class="button">
            <el-button class="buttons" type="primary" :disabled="this.queries.length===0" @click="reset">重置</el-button>
          </span>
        </el-col>
        <el-col :span="2.5">
          <span class="button">
          <el-button class="buttons" type="primary" :disabled="this.queries.length===0" :loading="loading"
                     @click="filter">开始选股</el-button>
          </span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {val_dict} from "../common/static";
import {val_level_dict} from '../common/static';
import {con_dict} from '../common/static';
import {val_continue_dict } from '../common/static';

export default {
  name: "QuerySelector",
  data() {
    return {
      loading: false,
      activeName: 'basicIndex',
      checkList: [],
      // value: [0, 2000],
      val_dict,
      val_level_dict,
      con_dict,
      val_continue_dict,
      query: {
        val: '',
        con: '',
        // 专门为累计类型提供的变量
        years: 1,
        // 专门为历史水平类型提供的变量
        mouths: 1,
        min: 0,
        max: 2000,
        value: [0, 2000],
      },
      queries: []
    }
  },
  computed: {
    available_cons() {
      // 在所有字段上提供历史水平查询
      let cons = {'current': '当前', 'level': '历史水平'}
      // 限制：仅在用户选择股息率时提供该累计选项，但实际上后端可以处理所有daily basic上的累计查询类型
      if (this.query.val === 'dv_ratio') {
        cons['continues'] = '累计'
      }
      return cons
    }
  },
  watch: {
    'query.con'() {
      if (this.query.con === 'level') {
        this.query.mouths = 1
        this.query.min = 0
        this.query.max = 1.00
      } else {
        this.value = [0, 2000]
        this.query.min = this.value[0]
        this.query.max = this.value[1]
      }
    }
  },

  methods: {
    dropItem(i) {
      this.queries.splice(i, 1)
      this.checkList.splice(i, 1)
    },
    checkListChange(k) {
      if (val_dict.hasOwnProperty(k)) {
        if (this.checkList.includes(k)) {
          this.queries.push({val: k, con: 'current', years: 1, mouths: 1, min: 0, max: 2000, value: [0, 2000]})
        } else {
          let index = this.queries.map(item => item.val).indexOf(k)
          this.queries.splice(index, 1)
        }
      }
      if (val_level_dict.hasOwnProperty(k)) {
        if (this.checkList.includes(k)) {
          this.queries.push({
            val: val_level_dict[k][1],
            con: 'level',
            years: 1,
            mouths: 1,
            min: 0,
            max: 2000,
            value: [0, 2000]
          })
        } else {
          let index = this.queries.map(item => JSON.stringify([item.val, item.con])).indexOf(JSON.stringify([val_level_dict[k][1], val_level_dict[k][2]]))
          this.queries.splice(index, 1)
        }
      }
      if (val_continue_dict.hasOwnProperty(k)) {
        if (this.checkList.includes(k)) {
          this.queries.push({
            val: val_continue_dict[k][1],
            con: 'continues',
            years: 1,
            mouths: 1,
            min: 0,
            max: 2000,
            value: [0, 2000]
          })
        } else {
          let index = this.queries.map(item => [item.val, item.con]).indexOf([val_continue_dict[k][1], val_continue_dict[k][2]])
          this.queries.splice(index, 1)
        }
      }

    },
    numberChange(i) {
      this.queries[i]['value'] = [this.queries[i]['min'], this.queries[i]['max']]
    },
    sliderChange(i) {
      this.queries[i]['min'] = this.queries[i]['value'][0]
      this.queries[i]['max'] = this.queries[i]['value'][1]
    },
    filter() {
      // 注意指针的问题
      this.$emit('filter', this.queries)
      // 清空query，同时确保指针更新
      this.query = {
        val: '',
        con: '',
        years: 1,
        mouths: 1,
        min: 0,
        max: 2000,
        value: [0, 2000],
      }
    },
    reset() {
      this.queries = []
      this.checkList = []
      this.$emit('reset')
    },
    //todo 在用户连续两次以上违反该条件时输入框不能正确的反映当前的min和max值
    inputCheck() {
      if (this.query.min > this.query.max) {
        this.query.min = this.query.max
      }
    }
  }
}
</script>

<style scoped>
.el-checkbox-group {
  margin-left: 25px;
  margin-top: 5px;
}

.el-checkbox {
  width: 190px;
  display: inline-block;
  line-height: 30px;

}

.el-slider {
  float: left;
  width: 40%;
  margin: 0 10px;
  padding: 0 10px;
}

.demonstration {
  float: left;
  line-height: 40px;
}

.demonstration2 {
  float: left;
  line-height: 40px;
}

.slider .el-input-number {
  width: 15%;
  float: left;
  line-height: 40px;
}

.years .el-input-number {
  margin-top: 5px;
  width: 50%;
  /*line-height: 40px;*/
}

.button {
  margin-top: 20px;
  float: right;
  margin-left: 10px;
}
.el-button.buttons{
  background-color: #545c64;
  border-color:#545c64;
}
.el-button.buttons:hover{
  color: #ffd04b;
}
.el-button.buttons:active{
  color: #ffd04b;
}

p {
  margin-bottom: 0;
  margin-top: 0;
  width: 100%;
  height: 35px;
  display: block;
  line-height: 35px;
  text-align: center;
  font-size: 14px;
}
  .font{
    font-weight: bold;
    color: #545c64;
  }
[class^="el-icon"] {
  margin-right: 10px;
}
.but_color{
  color: #545c64;
  border-color:#dadbdc;
  background-color: #fff;
}
.el-button.but_color:hover{
  border-color: #dadbdc;
  background-color: #F5F5F5;
}
.el-button.but_color:active{
  border-color: #dadbdc;
  background-color: #F5F5F5;
}

</style>
<style>
  /*标签页样式*/
  .el-tabs__item {
    padding: 0 20px;
    height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 600;
    color: #545c64;
    position: relative;
  }
  .el-tabs--card>.el-tabs__header {
    /*border-bottom: 1px solid #545c64;*/
    background-color: #fff;
  }
  .el-tabs__item.is-active {
    color: #EEB422;
  }
  .el-tabs__item:hover {
    color: #EEB422;
  cursor: pointer;
  }
  /*滑块样式*/
  .el-slider__bar {
    background-color: #545c64;
  }
  .el-slider__button {
    width: 13px;
    height: 13px;
    /*border-radius: 0;*/
    background: #FFFFFF;
    border: solid 2px #545c64;
  }
  /*checkbox样式*/
  .el-checkbox {
    color: #545c64;
    /*border-color: #545c64;*/
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #545c64;
    border-color: #545c64;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #545c64;
    border-color: #545c64;
  }
  .unselected .el-checkbox__input .el-checkbox__inner::after {
     border: 2px solid red;
     box-sizing: content-box;
       content: "";
       border-left: 0;
       border-top: 0;
       height: 7px;
       left: 3px;
       position: absolute;
       top: 1px;
       width: 3px;
  }
  .el-checkbox__input .el-checkbox__inner::after {
  border: 2px solid #fff;
  box-sizing: content-box;
    content: "";
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 3px;
    position: absolute;
    top: 1px;
    width: 3px;
  transform: rotate(45deg) scaleY(1);
  }

</style>