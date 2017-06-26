<?php
//修改专业的模型
namespace app\studentunion\model;

use think\Model;
use think\Db;
use think\request;

class Fraction extends Model{
    //设置当前模型对应的完整数据表名称
    protected $table = 'Dynamic';


    /**查询所有
    *$page分页页数
    *$rows分页的条数
     * [retrievemajor description]
     * @param  [type] $page [description]
     * @param  [type] $rows [description]
     * @return [type]       [description]
     */
    public function retrievefraction($page,$rows){
        $start = ($page-1)*$rows;
        $data = Db::name('Dynamic')
                       ->limit($start,$rows)//从第10行开始的25条数据
                       ->select();
        foreach ($data as $key => $value) {
            $id=$value["classes_id"];
            $class = $this->retrieveclasses($id);
            $data[$key]["classes_id"] = $class["cl_grade"]."级".$class["major_id"].$class["cl_classes"]."班";
        }
        var_dump($data);
        return $data;
    }
    public function retrieveclasses($id){
         $data = Db::name('Classes')
                       ->where('Id',$id)
                       ->find();
       
            $id=$data["major_id"];
            $major=$this->retrievemajor($id);
            $data["major_id"] = $major["ma_abbreviation"];
        return $data;
    }
    public function retrievemajor($id){
        $data = Db::name('Major')
                       ->where('id',$id)
                       ->find();
        return $data;
    }
    /**
     *查询所有记录条数
     * @return [type] [description]
     */
    public function countfraction()
    {
           $data =  Db::name('Dynamic')
                     ->count();//
        return $data;
    }


     /**
      * 添加专业
      * @param [type] $majorname [description]
      * @param [type] $remarks   [description]
      */
    public function addMajor($majorname,$abbreviation,$remarks)
    {
        $data = new MajorModel;
        $data ->ma_majorname = $majorname;
        $data ->ma_abbreviation = $abbreviation;
        $data->ma_remarks = $remarks;
        // $data->data = input('post.');
       $result = $data->save();
       return $result;
    }
/**
 * 修改专业
 * @param  [type] $Id        [description]
 * @param  [type] $majorname [description]
 * @param  [type] $remarks   [description]
 * @return [type]            [description]
 */
    public function editmajor($Id,$majorname,$abbreviation,$remarks)
    {


       $major =  Db::table('Major');
       $data = $major->where('Id', $Id)
                            ->update([
                                'ma_majorname' => $majorname,
                                'ma_abbreviation' => $abbreviation,
                                'ma_remarks' => $remarks,

                                ]);


       if ($data) {
            return true;
        } else {
            return false;
        }

    }


    /**
     * 删除专业
     * @param  [type] $id [description]
     * @return [type]     [description]
     */
    public function deletetmajor($id){
        $result = Majormodel::destroy($id);
        return $result;
    }

}
