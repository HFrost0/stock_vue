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
                  v-for="item in options"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span v-if="query.val!==''">
        <el-select
                v-model="query.con"
                clearable
                placeholder="请选择类型">
          <el-option
                  v-for="item in available_cons"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
          ></el-option>
        </el-select>
      </span>

      <!--当条件为累计时-->
      <span v-if="query.con==='continues'">
        <el-input-number v-model="query.years" controls-position="right" :min="1" :max="10"></el-input-number>年
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
  export default {
    name: "QuerySelector",
    computed: {
      available_cons() {
        let cons = [
          {
            value: 'current',
            label: '当前'
          }
        ]
        if (this.query.val === 'dv_ratio') {
          cons.push({
            value: 'continues',
            label: '累计'
          })
        }
        return cons
      }
    },
    data() {
      return {
        options: [
          {
            value: 'close',
            label: '股价'
          },
          {
            value: 'dv_ratio',
            label: '股息率（%）'
          },
          {
            value: 'pe',
            label: '市盈率'
          },
          {
            value: 'pe_ttm',
            label: '市盈率（TTM）'
          }],
        query: {
          val: '',
          con: '',
          years: 0,
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
          years: 0,
          min: 0,
          max: 10,
        }
      }
    }
  }
</script>

<style scoped>
  .button{
    float: right;
  }
</style>