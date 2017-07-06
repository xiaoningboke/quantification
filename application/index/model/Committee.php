<?php
namespace app\index\model;

use think\Model;
use think\Db;
// use think\Request;

class Committee extends Model
{
    //设置当前模型对于的完整数据表名称
    protected $table = 'committee';

    //查找量化委员
    public function selectCommittee($number,$password){
        $data = $this->selectStudent($number,$password);
        $committee = Db::name('Committee');
        $data = $committee
                ->where('student_id',$data["Id"])
                ->where('classes_id',$data["classes_id"])
                ->find();
        if ($data){
           return true;
        } else {
            return false;
        }

    }
    //验证学生账号密码是否正确
    public function selectStudent($number,$password){
        $student = Db::name('Student');
        $data = $student
                ->where('nt_number',$number)
                ->where('nt_password',$password)
                ->find();
        return $data;
    }
    //返回班级ID
    public function findstudent($number){
        $student = Db::name('Student');
        $data = $student
                ->where('nt_number',$number)
                ->column('classes_id');
        return $data;
    }


}
