 <template>
  <div>
    <el-container style="magin:0px;padding:0px">
      <el-table :data="tableData"
                ref="docTable"
                highlight-current-row
                style="width: 100%"
                @row-click="docSelected"
                @current-change="handleCurrentChange">
        <el-table-column prop="releaseDate"
                         label="发布日期"
                         width="180">
        </el-table-column>
        <el-table-column prop="user.name"
                         label="发布人员"
                         width="180">
        </el-table-column>
        <el-table-column prop="title"
                         label="文件名称">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <div>
              <el-button @click="docSearch">文件查询</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-container>

    <el-row>
      <el-col :span="2">
        <el-button @click="getDocTable"
                   style="text-align:left;font-size:15px"
                   type="text">更新文件</el-button>
      </el-col>
      <el-col :span="20">
        <el-pagination layout="prev, pager, next, jumper"
                       :total="total"
                       style="text-align:center"
                       :current-page="page"
                       :page-size="size">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="searchForm"
               :model="form"
               label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>



<script>
import { getDocTable } from "@/request/api"

export default {
  name: "Main",
  data () {
    return {
      dialogFormVisible: false,

      form: {
        title: "",

        number: 0,

        publishingDepartment: "",

        effectivenessLevel: 0,

        releaseDate: "",

        implementationDate: "",

        state: "",

        begin: 0,

        len: 0,

      },
      loading: true,
      //axios请求
      tableData: null,

      allData: null,
      total: 0,//总条目数量

      page: 1,
      size: 8,

      currentRow: 0,
    }
  },
  methods: {
    docSearch () {
      this.dialogFromVisible = true;
    },

    onSubmit () {
      console.log("submit");
    },

    getTableData () {
      this.tableData = this.allData.slice(
        (this.page - 1) * this.size,
        this.page * this.size
      );
      this.total = this.allData.length
    },

    currentChange (val) {
      console.log("当前页数", val);
      this.page = val;
      this.getTableData();
    },

    sizeChange (val) {
      console.log("一页条目数", val);
      this.size = val;
      this.page = 1;
      this.getTableData();
    },


    docSelected (row, event, column) {
      console.log(row + "" + event + "" + column)
    },

    getDocTable () {
      getDocTable({ begin: 0, len: this.size }).then((res) => {
        console.log(res);
        console.log("Doc Get");
        this.tableData = res.data.content;
        for (let i = 0; i < this.size; i++) {
          this.tableData[i].releaseDate = this.fun(res.data.content[i].releaseDate);
        }
        //this.total = ;
      }).catch((err) => {
        console.log("err==>", err);
      });
    },

    fun (dateStr) {
      console.log(dateStr);
      let date = new Date(dateStr.replace(/-/g, '/'));
      let str = "";
      str += date.getFullYear() + "-";
      str += (date.getMonth() + 1) + "-";
      str += date.getDate();
      return str;
    },

    handleCurrentChange () {

    },

    handleDocOpen (val) {

    },
  }
}
</script>

<style scoped>
</style>