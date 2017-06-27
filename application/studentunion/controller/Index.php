<?php
//学生会模块控制器
namespace app\studentunion\controller;

use \think\Controller;
use \think\Model;
use \think\Response;

use  app\studentunion\model\studentunionModel;

use think\View;     //视图类
use think\Session;

class Index extends Controller{

   /**
    * 首页
    * @return [type] [description]
    */
    public function index(){
         return $this->fetch('index');
    }

    /**
     * 修改自己信息
     * @return [type] [description]
     */
    public function revise(){
        $message = model("studentunionModel");
        $data = $message->retrieve(1);
        $this->assign("message",$data);
         return $this->fetch('self');

    }

    /**
     * 接收修改自己信息
     * @return [type] [description]
     */
    public function revisemessage(){
        $message = model("studentunionModel");
        $res = $message->modify(1);
         if($res){
         $this->success('修改成功','index/revise');
        }else{
          $this->error('修改失败','index/revise');
        }
    }
    /**
     * 修改密码
     * @return [type] [description]
     */
    public function modifypassword(){
        $message = model("studentunionModel");
        $data = $message->retrieve(1);
        $this->assign("message",$data);
         return $this->fetch('password');
    }
    /**
     * 接收修改密码
     * @return [type] [description]
     */
    public function revisepassworld(){

            $message = model("studentunionModel");
            $data = $message->retrieve(1);
            $pwd = $data[0]['on_password'];
            if( input('post.oldpassword') == $pwd){
                $res = $message->modifypass(1);
                if($res){
                     $this->success('修改成功','modifypassword');
                }else{
                    $this->error('修改失败','modifypassword');
                }
            }else{
                $this->error('原密码错误','modifypassword');
            }

    }
    /**
     * 显示分数设置
     * @return [type] [description]
     */
    public function fraction(){
        $fraction = model('Fraction');
        $classes = $fraction->retrieveclass();
        foreach ($classes as $key => $value) {
            $class[$key]['text'] = "{$value['cl_grade']}级{$value['major_id']}{$value['cl_classes']}班";
            $class[$key]['value'] = $value['Id'];
        }
        $this->assign('class',$class);
        return $this->fetch('fraction');

    }
    /**
     * 分数分页传值
     * @return [type] [description]
     */
    public function fractionmessage(){
        $page = isset($_POST['page'])?intval($_POST['page']):1;//默认页码
        $rows = isset($_POST['rows'])?intval($_POST['rows']):5;//默认行数
        $fraction = model('Fraction');
        $result = $fraction->retrievefraction($page,$rows);
        $result = json_encode($result);
        $total = $fraction->countfraction();
        $result = substr($result, 0, -1);
        $result = '{"total" : '.$total.', "rows" : '.$result.']}';
     //var_dump($result);exit();
    echo $result;

    }
    /**
     * 添加量化数据
     * @return [type] [description]
     */
   public function addfraction()
   {
        $studentunion_id = input('post.studentunion_id');
        $classes_id = input('post.classes_id');
        $co_name = input('post.co_name');
        $co_time = input('post.co_time');
        $co_time = strtotime($co_time);
        $co_reason = input('post.co_reason');
        $co_fraction = input('post.co_fraction');
        $co_remarks = input('post.co_remarks');        
        $major = model('Fraction');
          $result = $major->addFraction($studentunion_id,$classes_id,$co_name,$co_time,$co_reason,$co_fraction,$co_remarks);
        if ($result) {
             echo "操作成功";
           } else {
             echo "操作失败";
           }

   }
    /**
     * 修改量化数据
     * @return [type] [description]
     */
   public function editfraction()
   {
        $id =  input('post.Id');
        $studentunion_id = input('post.studentunion_id');
        $classes_id = input('post.classes_id');
        $co_name = input('post.co_name');
        $co_time = input('post.co_time');
        $co_time = strtotime($co_time);
        $co_reason = input('post.co_reason');
        $co_fraction = input('post.co_fraction');
        $co_remarks = input('post.co_remarks'); 
        $fraction = model('Fraction');
         $result = $fraction->editFraction($id,$studentunion_id,$classes_id,$co_name,$co_time,$co_reason,$co_fraction,$co_remarks);
        if ($result) {
             echo "操作成功";
           } else {
             echo "操作失败";
           }

   }

    /**
     * 删除量化数据
     * @return [type] [description]
     */
    public function deletefraction(){

         $ids = input('post.ids');
        $major = model('Fraction');
       $result = $major->deletefraction($ids);
       if ($result) {
         return $result;
       } else {
         return 0;
       }
    }  
  
    /**
     * 返回json数据
     * @param  string $code    [description]
     * @param  string $message [description]
     * @param  [type] $data    [description]
     * @return [type]          [description]
     */
    private function toJson($code = '200', $message = '数据正确', $data)
    {
        $pushdata = []; //定义新数组
        $pushdata['code'] = $code;
        $pushdata['message'] = $message;
        $pushdata['data'] = $data;
        return json_encode($pushdata, JSON_UNESCAPED_UNICODE); //返回正确汉字
    }

}
