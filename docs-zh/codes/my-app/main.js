const express=require('express');//导入express函数

const app=express();//执行express函数得到核心对象

//定义一个二级app，专门处理/admin的请求
const admin=express();

//设置应用的属性，存在应用的整个生命周期
app.locals.title = 'My App';
app.locals.strftime = require('strftime');
app.locals.email = 'me@myapp.com';


//托管静态资源,app.static(root,[options]);
app.static('./static',{
    index:false,
    lastModified:true,
    maxAge:200,
    redirect:true,
    setHeaders:()=>{}
});

//注册api
app.get('/', function(req, res){
    console.log(admin.mountpath);
    res.send('hello world');
});

//监听端口3000
app.listen(3000);

admin.get('/', function (req, res) {
  console.log(admin.mountpath); // [ '/adm*n', '/manager' ]
  res.send('Admin Homepage');
})

var secret = express();
secret.get('/', function (req, res) {
  console.log(secret.mountpath); // /secr*t
  res.send('Admin Secret');
});

admin.use('/secr*t', secret); // load the 'secret' router on '/secr*t', on the 'admin' sub app
app.use(['/adm*n', '/manager'], admin); // load the 'admin' router on '/adm*n' and '/manager', on the parent app

admin.on('mount', function (parent) {
  console.log('Admin Mounted');
  console.log(parent); // refers to the parent app
});

//处理/admin
app.use('/admin',admin);

