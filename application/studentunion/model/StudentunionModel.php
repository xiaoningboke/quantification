<?php
//书记模块的模型
namespace app\studentunion\model;

use think\Model;
use think\Db;

class StudentunionModel extends Model
{
    //设置当前模型对应的完整数据表名称
    protected $table = 'Studentunion';
    //查询
    public function retrieve($id){
            $user = Db::name('studentunion');
            $data=$user->where('Id',$id)->select();
            return $data;
    }
    //修改
    public function modify($id){
        $res = Db::table('Studentunion')->where('id',$id)->update(['on_department' => input('post.name'),'on_email' => input('post.email')]) ;
        return $res;

    }
    //修改密码
        public function modifypass($id){
        $res = Db::table('Studentunion')->where('id',$id)->update(['on_password' => input('post.password')]) ;
        return $res;

    }
    //添加
    public function add(){
        $user = new SecretaryModel;
        $user->data = input('post.');
        if($user->save()){
            return true;
        }else{
            return false;
        }
    }

}
