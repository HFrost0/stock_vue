<template>
  <div>
    <el-card class="card">
      <span>
        <el-select
          v-model="query.val"
          @change="query.con=''"
          clearable
          placeholder="请选择条件">
          <el-option
            v-for="(key, value) in val_dict"
            :key="key"
            :label="key"
            :value="value">
          </el-option>
        </el-select>
      </span>

      <span v-if="query.val!==''">
        <el-select
          v-model="query.con"
          clearable
          placeholder="请选择类型">
          <el-option
            v-for="(key, value) in available_cons"
            :key="key"
            :label="key"
            :value="value"
          ></el-option>
        </el-select>
      </span>

      <!--当条件为累计时-->
      <span v-if="query.con==='continues'">
        <el-input-number v-model="query.years" controls-position="right" :min="1" :max="10"></el-input-number>年
      </span>
      <!--当条件为历史水平时-->
      <span v-if="query.con==='level'">
        （过去<el-input-number v-model="query.mouths" controls-position="right" :min="1" :max="120"></el-input-number>个月）
      </span>

      <span v-if="query.con!==''">
        大于<el-input-number v-model="query.min" controls-position="right"></el-input-number>
        小于<el-input-number v-model="query.max" controls-position="right"></el-input-number>
      </span>

      <span v-if="query.con!==''" class="button">
        <el-button @click="addQuery">添加</el-button>
      </span>


    </el-card>
  </div>
</template>

<script>
  import {val_dict} from "../common/static";

  export default {
    name: "QuerySelector",
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
    watch:{
      'query.con'(){
        if (this.query.con === 'level'){
          this.query.min = 0.01
          this.query.max = 0.5
        }
        else{
          this.query.min = 0
          this.query.max = 10
        }
      }
    },
    data() {
      return {
        val_dict,
        query: {
          val: '',
          con: '',
          // 专门为累计类型提供的变量
          years: 1,
          // 专门为历史水平类型提供的变量
          mouths: 1,
          min: 0,
          max: 10,
        },
      }
    },
    methods: {
      addQuery() {
        // 注意指针的问题
        this.$emit('addQuery', this.query)
        // 清空query，同时确保指针更新
        this.query = {
          val: '',
          con: '',
          years: 1,
          mouths: 1,
          min: 0,
          max: 10,
        }
      }
    }
  }
</script>

<style scoped>
  .button {
    float: right;
  }
</style>