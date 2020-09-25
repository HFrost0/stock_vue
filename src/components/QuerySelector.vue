<template>
  <div>
    <el-card>
      <el-tabs class="tabs" @tab-click="tabClick" v-model="activeName" tab-position="left" type="card" style="height: 250px;">
        <el-tab-pane name="basicIndex">
          <span slot="label"><i class="el-icon-data-line"></i> 当前行情</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="k in Object.keys(val_dict).splice(0,13)" :label="k" @change="checkListChange(k)"><p>
              {{ val_dict[k][0] }}</p></el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>

        <el-tab-pane name="historyIndex">
          <span slot="label"><i class="el-icon-data-analysis"></i> 历史水平</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="k in Object.keys(val_dict).splice(13,26)" :label="k" @change="checkListChange(k)"><p>
              {{ val_dict[k][0] }}</p>
            </el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
        <el-tab-pane name="continueIndex">
          <span slot="label"><i class="el-icon-date"></i> 连续行情</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="k in Object.keys(val_dict).splice(26,27)" :label="k" @change="checkListChange(k)"><p>
              {{ val_dict[k][0] }}</p>
            </el-checkbox>
          </el-checkbox-group>
        </el-tab-pane>
        <el-tab-pane name="otherIndex">
          <span slot="label"><i class="el-icon-pie-chart"></i> 其他指标</span>
          <!--          <el-checkbox-group v-model="checkList">-->
          <!--            <el-checkbox v-for="(v,k) in val_other_dict" :label="k" @change="checkListChange(k)"><p>{{ v[0] }}</p>-->
          <!--            </el-checkbox>-->
          <!--          </el-checkbox-group>-->
          <span>更新中</span>
        </el-tab-pane>

        <el-tab-pane v-if="this.user" name="MyCollections">
          <span slot="label"><i class="el-icon-star-off"></i> 我的收藏</span>
          <span v-if="Object.keys(this.myCollections).length===0">暂无收藏指标</span>
          <el-tag class="tag" type="info" v-for="name in Object.keys(this.myCollections)" :closable=true effect="light" @click="clickCollection(name)" @close="dropCollection">
            <el-button type="text" class="button_text">{{ name }}</el-button>
            <el-dialog title="删除指标" :visible.sync="dropDialogVisible" width="25%" >
              <span>是否删除该指标？</span>
              <span slot="footer" class="dialog-footer">
                <el-button class="but_color" @click="canDropColl(name)" size="small">取 消</el-button>
                <el-button class="buttons" type="primary" @click="dropColl(name)" size="small">确 定</el-button>
              </span>
            </el-dialog>
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-divider content-position="left"><i class="el-icon-search"></i><span class="font" style="font-size: 13px;">筛选条件</span></el-divider>
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
          <p>{{ con_dict[q.con] }}{{ val_dict[q.val][0] }}</p>
        </el-col>
        <el-col :span="11" align="middle" class="slider">
          <el-input-number v-model="q.min_num" :controls="false" size="mini" :min="q.range[0]" :max="q.range[1]"
                           :step="0.01" :precision="2" @change="numberChange(i)"></el-input-number>
          <el-slider class="slider_color" style="width: 60%; float: left;" v-model="q.value" range :min="q.range[0]" :max="q.range[1]"
                     :step="0.01" @change="sliderChange(i)"></el-slider>
          <el-input-number v-model="q.max_num" :controls="false" size="mini" :min="q.range[0]" :max="q.range[1]"
                           :step="0.01" :precision="2" @change="numberChange(i)"></el-input-number>

        </el-col>
        <el-col :span="5" v-if="q.con==='level'" align="middle" class="years">
          <span>
            <el-input-number v-model="q.mouths" :min="1" :max="24" :precision="0"
                             size="mini"></el-input-number><span style="font-size: 13px;">月</span>
          </span>
        </el-col>
        <el-col :span="5" v-if="q.con==='current'" align="middle">
          <p>最新数据</p>
        </el-col>
        <el-col :span="5" v-if="q.con==='continues'" align="middle" class="years">
          <span>
            <el-input-number v-model="q.years" :min="1" :max="10" :precision="0" size="mini"></el-input-number><span style="font-size: 13px;">年</span>
          </span>
        </el-col>
        <el-col :span="3" align="middle">
          <el-button class="but_color" icon="el-icon-delete-solid" size="small" @click="dropItem(i)"></el-button>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="2" :offset="2" align="right">
          <span class="button">
            <el-button  class="buttons" type="primary" :disabled="this.queries.length===0" @click="addCollections" size="small">添加至我的收藏</el-button>
          </span>
        </el-col>
        <el-col :span="2" :offset="15" align="right">
          <span class="button">
            <el-button class="buttons" type="primary" :disabled="this.queries.length===0" @click="reset" size="small">重 置</el-button>
          </span>
        </el-col>
        <el-col :span="2.5">
          <span class="button">
          <el-button class="buttons" type="primary" :disabled="this.queries.length===0" :loading="loading"
                     @click="filter" size="small">开始选股</el-button>
          </span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {val_dict} from "../common/static";
// import {val_level_dict} from '../common/static';
import {con_dict} from '../common/static';
import router from "@/router";
import {getCollections, get_range} from "@/network/stocks";

  export default {
    name: "QuerySelector",
    data() {
      return {
        dropDialogVisible: false,
        loading: false,
        activeName: 'basicIndex',
        checkList: [],
        // value: [0, 2000],
        val_dict,
        con_dict,
        query: {
          val: '',
          con: '',
          // 专门为累计类型提供的变量
          years: 1,
          // 专门为历史水平类型提供的变量
          mouths: 1,
          min_num: 0,
          max_num: 2000,
          value: [0, 2000],
          range:[0,2000]
        },
        queries: [],
        myCollections: {},
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
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

    },

    methods: {
      tabClick(tab, event) {
        //ToDo 点击我的收藏，获取后端用户收藏数据
        if (tab.name === 'MyCollections') {
          getCollections().then(res => {
            const queries = res.data['queries']
            for (let q of queries) {
              this.$set(this.myCollections,q.name,queries.filter(item => {
                return item['name'] === q.name
              }))
              // this.myCollections[q['name']] = []
            }
            // for (let key in this.myCollections) {
            //   this.myCollections[key] = queries.filter(q => {
            //     return q['name'] === key
            //   })
            // }
          })
        }
      },
      addCollections() {
        if (this.user) {
          this.$prompt('请输入指标名称', '新建指标', {
            inputPlaceholder: '指标名称',
            confirmButtonText: '确定',
            inputValidator: (value) => {
              if (value.trim().length < 1) {
                return '输入不能为空'
              }
            },
            cancelButtonText: '取消',
            // inputErrorMessage: '邮箱格式不正确'
          }).then(({value}) => {
            value = value.trim()
            if(this.myCollections.hasOwnProperty(value)){
              this.$confirm('该指标名称已使用, 是否更新该指标?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // type: 'warning'
              }).then(() => {
                let qs_clone = this.queries.map(item => item)
                this.$set(this.myCollections, value, qs_clone)
                console.log(this.myCollections)
                //ToDo [value,qs_clone]写入后端数据库
                this.$message({ type: 'success', message: '成功更新指标: ' + value,
                });
              }).catch(() => {
                this.$message({type: 'info', message: '已取消更新'
                });
              });
            }else{
              let qs_clone = this.queries.map(item => item)
              this.$set(this.myCollections, value, qs_clone)
              console.log(this.myCollections)
              //ToDo [value,qs_clone]写入后端数据库
              this.$message({type: 'success', message: '已收藏指标: ' + value, duration: 2000});
            }
          }).catch(() => {
            this.$message({type: 'info', message: '取消收藏'});
          });
        } else {
          this.$confirm('是否跳转到登录页面?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            router.push('/authenticate')
          }).catch(() => {
            this.$message({type: 'info', message: '取消登录', duration: 1000});
          });
        }
      },
      clickCollection(name) {
        this.queries = this.myCollections[name].map(item => item)
        let arr_value = this.queries.map(item => [item.val, item.con])
        let arr_key = Object.keys(this.val_dict)
        let checkTemp = []
        for (let i = 0; i < arr_value.length; i++) {
          let index = Object.values(this.val_dict).map(item => JSON.stringify([item[1], item[2]])).indexOf(JSON.stringify(arr_value[i]))
          checkTemp.push(arr_key[index])
        }
        this.checkList = checkTemp

      },
      dropCollection() {
        this.dropDialogVisible = true

      },
      dropColl(name){
        this.$delete(this.myCollections,name)
        this.dropDialogVisible = false
        //ToDo 后端数据库删除该条收藏
      },
      canDropColl(){
        this.dropDialogVisible = false
      },
      dropItem(i) {
        this.queries.splice(i, 1)
        this.checkList.splice(i, 1)
      },
      checkListChange(k) {
        get_range({val:val_dict[k][1]}).then(res=>{
          if (this.checkList.includes(k)) {
            let ran = Object.values(res.data)
            console.log(ran);
            this.query.val = val_dict[k][1]
            this.query.con = val_dict[k][2]
            this.query.years=1
            this.query.mouths=1
            if (val_dict[k][2]==='level'){
              this.query.min_num=0
              this.query.max_num=1
              this.query.value=[0,1]
              this.query.range=[0,1]
            }
            else {
              this.query.min_num=ran[0]
              this.query.max_num=ran[1]
              this.query.value=ran
              this.query.range=ran
            }

            console.log(this.query);

            this.queries.push(
                    JSON.parse(JSON.stringify(this.query))
            )
          }else {
            // let index = this.queries.map(item => item.val).indexOf(k)
            let index = this.queries.map(item => JSON.stringify([item.val, item.con])).indexOf(JSON.stringify([val_dict[k][1], val_dict[k][2]]))
            // console.log(this.queries.map(item => (item.val, item.con))[2]==(val_dict[k][1], val_dict[k][2]))
            this.queries.splice(index, 1)
          }

        })



      },
      numberChange(i) {
        this.queries[i]['value'] = [this.queries[i]['min_num'], this.queries[i]['max_num']]
      },
      sliderChange(i) {
        this.queries[i]['min_num'] = this.queries[i]['value'][0]
        this.queries[i]['max_num'] = this.queries[i]['value'][1]
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
          min_num: 0,
          max_num: 2000,
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
        if (this.query.min_num > this.query.max_num) {
          this.query.min_num = this.query.max_num
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
    font-size: 13px;
  }
  .font{
    font-size: 13px;
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
  .button_text{
    color: #545c64;
    font-size: 13px;

  }
  .el-button.button_text:hover{
    font-weight: bold;
  }
  .el-button.button_text:active{
    font-weight: bold;
  }
  .tag {
    margin-left: 10px;
    height: 40px;
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
    font-size: 13px;
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
    border: 2px solid #545c64;
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