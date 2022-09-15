<template>
  <div>
    <Header>头部</Header>
    <div class="main">
      <div >
        <template>
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
      <div class="blogMain">
        <div class="block">
          <el-timeline>
            <el-timeline-item :timestamp="blog.created" placement="top" v-for="(blog,key) in blogs" :key=key>
              <el-card>
                <h4>
                  <router-link :to="{  name: 'blogdetail', params: {blogId: blog.id}}">
                    {{blog.title}}
                  </router-link>
                </h4>
                <p>{{blog.description}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
        <el-pagination
            class="blogPage"
            background
            layout="prev, pager, next"
            :current-page = "currentPage"
            :page-size = "pageSize"
            :total="total"
            @current-change = page
        >
        </el-pagination>
      </div>
      <div class="tag">
        <el-tag closable>java基础</el-tag>
        <el-tag type="success" closable>java进阶</el-tag>
        <el-tag type="info" closable>spring</el-tag>
        <el-tag type="warning" closable>springmvc</el-tag>
        <el-tag type="danger" closable>数据库</el-tag>
      </div>
    </div>

  </div>
</template>

<script>
import Header from "../components/Header"
export default {
  name: "Blogs",
  components: {Header},
  data() {
    return {
      blogs : {},
      currentPage : 1,
      total : 0,
      pageSize : 5
    }
  },
  methods: {
    page(currentPage){
      const _this = this
      _this.$axios.get(`/blogs/listBlogs?currentPage=${this.currentPage}`).then(res => {
         console.log(res)
          var data = res.data.data
          _this.blogs = data.records
          _this.currentPage = data.current
          _this.pageSize = data.size
          _this.total = data.total
      })
    }
  },
  created () {
    this.page(1)
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .main {
    width: 80%;
    margin: 0 auto;
  }
  .blogMain {
    width: 60%;
    float:left;

  }
  .blogPage {
    margin: 0 auto;
    text-align: center;
  }
  .tag {
    width: 30%;
    float: left;
    margin-left: 5%;
    margin-top: 2%;
  }
</style>