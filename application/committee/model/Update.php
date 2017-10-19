<?php
//修改分页问题产生的模型
namespace app\committee\model;

use think\Model;
use think\Db;
use think\request;
use think\Session;

class Update extends Model
{
    //设置当前模型对应的完整数据表名称
    protected $table = 'Studscoreinfo';
      //通过学号查找班级id
    public function classNumber($nt_number)
    {
            $classId = $this->classId($nt_number);
            $result = $this->classNum($classId);
            return $result;
    }

    //通过学号查找班级id
    private function classId($nt_number)
    {
        $data = Db::name('Student')
                    ->where('nt_number',$nt_number)
                    ->value('classes_id');
        return $data;
    }

    //通过班级id查找班级人数总数
    private function classNum($classId)
    {
        $data = Db::name('Student')
                    ->where('classes_id',$classId)
                    ->count();
        return $data;
    }


}
