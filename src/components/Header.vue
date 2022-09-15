<template>
  <el-container>
    <el-header>
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <div class="leftDiv">
                <div class="blogAvater">
                  <img src="../assets/blog.jpg">
                </div>
                <div class="blogFont">
                  JonefyWangBlog
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple-light">
              <div class="menu">
                <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    text-color="black"
                    active-text-color="#ffd04b">
                  <el-menu-item index="1"><a href="/blogs" class="a">首  页</a></el-menu-item>
                  <el-menu-item index="2"><a href="/blogs/edit" class="a">想  法</a></el-menu-item>
                  <el-submenu index="3">
                    <template slot="title">实 验 室</template>
                    <el-menu-item index="3-1"><a href="/blogs/edit" class="a">选项1</a></el-menu-item>
                    <el-menu-item index="3-2">选项2</el-menu-item>
                    <el-menu-item index="3-3">选项3</el-menu-item>
                  </el-submenu>
                  <el-menu-item index="4" class="a">时 光 轴</el-menu-item>
                  <el-menu-item index="5" class="a">赞  赏</el-menu-item>
                  <el-menu-item index="6" class="a">友  链</el-menu-item>
                  <el-menu-item index="7" class="a">关  于</el-menu-item>
                </el-menu>
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <div class="rightDiv">
                <div class="box">
                  <el-input
                      class="inputBox"
                      placeholder="请输入内容"
                      v-model="input"
                      clearable
                      prefix-icon="el-icon-search">
                  </el-input>
                </div>
                <div>
                  <el-avatar class="userAvater" :src="user.avatar" ></el-avatar>
                </div>
                <div>
                  <span class="username">{{user.username}}</span>
                  <el-dropdown>
                <span class="el-dropdown-link">
                  <i style="font-size:20px" class="el-icon-s-tools"/>
                </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-user-solid"><router-link to="/person" class="a">个人信息</router-link></el-dropdown-item>
                      <el-dropdown-item icon="el-icon-switch-button" v-show="!hasLogin"><el-link @click="login">登录</el-link></el-dropdown-item>
                      <el-dropdown-item icon="el-icon-switch-button" v-show="hasLogin"><el-link @click="logout">退出</el-link></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
    </el-header>
  </el-container>

</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      input: '',
      user: {
        username:'请先登录',
        avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      },
      hasLogin : false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout: function () {
      const _this = this
      console.log(this)
      console.log(localStorage.getItem("token"))
      _this.$axios.get("/logout", {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        _this.$store.commit("REMOVE_INFO")
        _this.$router.push("/login")
      })
    },
    login () { //跳转登录页面进行登录
      this.$router.push("/login")
    }
  },
  created() {
    if (this.$store.getters.getUser){
      this.user.username = this.$store.getters.getUser.username
      this.user.avatar = this.$store.getters.getUser.avatar

      this.hasLogin = true
    }
  }
}
</script>

<style>
      img{
        width: 40px;
        height: 40px;
      }
    .el-header, .el-footer {
      background-color: white;
      color: #333;
      text-align: center;
      line-height: 60px;
    }

    body > .el-container {
      margin-bottom: 40px;
    }

    .el-row {
      margin-bottom: 20px;
    &:last-child {
       margin-bottom: 0;
     }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: none;
    }
    .bg-purple {
      background: white;
    }
    .bg-purple-light {
      background: white;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 60px;
    }
    .row-bg {
      padding: 10px 0;
    }

    .row-bg {

    }

    .blogAvater {
      margin-top: 10px;
      margin-left: 20%;
      float:left
    }
    .blogFont {
      font-size: 25px;
      margin-left: 10px;
      float:left;
      font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Times New Roman","罗马体",Arial,sans-serif;
    }
    .menu {
      margin-left: 10%;
    }
    .box {
      width: 200px;
      border-radius: 4px;
    }
    .inputBox {
      min-height: 30px;
      float:left
    }
    .userAvater {
      margin-top: 10px;
      margin-left: 5%;
      float:left
    }
    .username {
      margin-left: 5%;
      float:left
    }
    .a {
      text-decoration: none;
    }
</style>