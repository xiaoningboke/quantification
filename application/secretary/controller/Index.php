<?php
//书记模块控制器
namespace app\secretary\controller;

use \app\common\Common;
use \think\Controller;
use \think\Model;
use \think\Response;

use  app\secretary\model\ClassesModel;

use think\View;     //视图类
use think\Session;

class Index extends Common{

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
        $message = model("SecretaryModel");
        $data = $message->retrieve(1);
        $this->assign("message",$data);
         return $this->fetch('self');

    }

    /**
     * 接收修改自己信息
     * @return [type] [description]
     */
    public function revisemessage(){

        $message = model("SecretaryModel");
        $res = $message->modify();
         if($res){
         $this->success('修改成功','Index/revise');
        }else{
          $this->error('修改失败','Index/revise');
        }
    }
    /**
     * 修改密码
     * @return [type] [description]
     */
    public function modifypassword(){
        $message = model("SecretaryModel");
        $data = $message->retrieve(1);
        $this->assign("message",$data);
         return $this->fetch('password');
    }
    /**
     * 接收修改密码
     * @return [type] [description]
     */
    public function revisepassworld(){

            $message = model("SecretaryModel");
            $data = $message->retrieve(1);
            $pwd = $data[0]['ad_password'];
            $oldpassword = input('post.oldpassword');
            $oldpassword = md5($oldpassword);
            $password = input('post.password');
            $password = md5($password);
            if( $oldpassword == $pwd){
                $res = $message->modifypass($password);
                if($res){
                     $this->success('修改成功','Index/modifypassword');
                }else{
                    $this->error('修改失败','Index/modifypassword');
                }
            }else{
                $this->error('原密码错误','Index/modifypassword');
            }

    }
    /**
     * 显示修改专业
     * @return [type] [description]
     */
    public function major(){

         return $this->fetch('major');

    }
    /**
     * 专业分页传值
     * @return [type] [description]
     */
    public function majormessage(){
        $sort =  input('post.sort');
        $page = isset($_POST['page'])?intval($_POST['page']):1;//默认页码
        $rows = isset($_POST['rows'])?intval($_POST['rows']):5;//默认行数
        $major = model('MajorModel');
        $result = $major->retrievemajor($page,$rows,$sort);
        $result = json_encode($result);
        $total = $major->countmajor();
        $result = substr($result, 0, -1);
        $result = '{"total" : '.$total.', "rows" : '.$result.']}';
    // var_dump($result);
    echo $result;

    }
    /**
     * 添加专业
     * @return [type] [description]
     */
   public function addmajor()
   {
        $majorname = input('post.majorname');
        $abbreviation = input('post.abbreviation');
        $remarks = input('post.remarks');
        $major = model('MajorModel');
          $result = $major->addMajor($majorname,$abbreviation,$remarks);
        if ($result) {
             echo "操作成功";
           } else {
             echo "操作失败";
           }

   }
    /**
     * 修改专业
     * @return [type] [description]
     */
   public function editmajor()
   {
        $id =  input('post.Id');
        $majorname = input('post.majorname');
        $remarks = input('post.remarks');
        $abbreviation = input('post.abbreviation');
        $major = model('MajorModel');
          $result = $major->editmajor($id,$majorname,$abbreviation,$remarks);
        if ($result) {
             echo "操作成功";
           } else {
             echo "操作失败";
           }

   }

    /**
     * 删除专业
     * @return [type] [description]
     */
    public function deletemajor(){

         $ids = input('post.ids');
        $major = model('MajorModel');
       $result = $major->deletetmajor($ids);
       if ($result) {
         return $result;
       } else {
         return 0;
       }
    }

    /**
     *显示班级
     * @return [type] [description]
     */
   public function grade(){
        $classes = model('ClassesModel');
        $data = $classes->querymajor();
        $t = count($data);
        for($i=0;$i<$t;$i++){
            $s[$i]= "{"."value".":"."'".$data[$i]["Id"]."'".","."text".":"."'".$data[$i]["ma_majorname"]."'"."}";

        }
        $name = $classes->queryheadmaster();
        //$n = count($name);
        foreach ($name as $key => $value) {
            $ban[$key]['text'] = "{$value['ad_number']}({$value['ad_name']})";
            $ban[$key]['value'] = $value['Id'];
       }
       $this->assign('data',$s);
       $this->assign('name',$name);
       $this->assign('ban',$ban);
        return $this->fetch('grade');

  }
   /**
    * 班级分页传值
    * @return [type] [description]
    */
       public function classmessage(){
        $sort =  input('post.sort');
        $page = isset($_POST['page'])?intval($_POST['page']):1;//默认页码
        $rows = isset($_POST['rows'])?intval($_POST['rows']):25;//默认行数
        $classes = model('ClassesModel');
        $result = $classes->retrieveclasses($page,$rows,$sort);
        $result = json_encode($result);
        $total = $classes->countclasses();
        $result = substr($result, 0, -1);
        $result = '{"total" : '.$total.', "rows" : '.$result.']}';
        // var_dump($result);
        echo $result;


    }
    /**
     * 添加班级
     * @return [type] [description]
     */
     public function addclasses()
   {

        $cl_grade = input('post.cl_grade');
        $major_id = input('post.major_name');
        $cl_classes = input('post.cl_classes');
        $admin_id = input('post.cl_headmaster');
        $cl_remarks = input('post.cl_remarks');
        $major = model('ClassesModel');
          $result = $major->addClasses($cl_grade,$major_id,$cl_classes,$admin_id,$cl_remarks);
        $committee = model('Committee');
          $com = $committee->addcommittee($result);
        if ($result) {
             echo "操作成功";
           } else {
             echo "操作失败";
           }
   }
   /**
    * 修改班级
    * @return [type] [description]
    */
    public function editclasses(){
         $id =  input('post.Id');
        $cl_grade = input('post.cl_grade');
        $major = input('post.major_name');
        $sign = is_numeric($major);
        if($sign){
            $major_id = $major;
        }else{
            $major_id = input('post.major_id');
        }
        $admin = input('post.cl_headmaster');
        $signa = is_numeric($admin);
        if($signa){
            $admin_id = $admin;
        }else{
            $admin_id = input('post.admin_id');
        }
        $cl_classes = input('post.cl_classes');
        $cl_headmaster = input('post.cl_headmaster');
        $cl_remarks = input('post.cl_remarks');
        $classes = model('ClassesModel');
          $result = $classes->editclasses($id,$cl_grade,$major_id,$cl_classes,$admin_id,$cl_remarks);
        if ($result) {
             echo"操作成功";
           } else {
             echo "操作失败";
           }
    }


    /**
     * 删除班级
     * @return [type] [description]
     */
    public function deleteclasses(){
        $ids = input('post.ids');
        $major = model('ClassesModel');
       $result = $major->deletetclass($ids);
       if ($result) {
         return $result;
       } else {
         return 0;
       }
    }
    /**
     * 分配班主任
     * @return [type] [description]
     */
    public function headmaster(){
            return $this->fetch('headmaster');
    }
    /**
     * 反馈班主任信息及分页
     * @return [type] [description]
     */
public function headmastermessage(){
        $sort =  input('post.sort');
        $page = isset($_POST['page'])?intval($_POST['page']):1;//默认页码
        $rows = isset($_POST['rows'])?intval($_POST['rows']):5;//默认行数
        $classes = model('HeadmasterModel');
        $result = $classes->retrieveheadmaster($page,$rows,$sort);
        $result = json_encode($result);
        $total = $classes->countheadmaster();
        $result = substr($result, 0, -1);
        $result = '{"total" : '.$total.', "rows" : '.$result.']}';
        // var_dump($result);
        echo $result;
    }
    /**
     * 添加班主任
     * @return [type] [description]
     */
      public function addheadmaster()
   {
        $ad_number = input('post.number');
        $ad_name = input('post.name');
        $ad_sex = input('post.sex');
        $ad_email = input('post.email');
        $ad_remarks = input('post.remarks');
        $major = model('HeadmasterModel');
          $result = $major->addheadmaster($ad_number,$ad_name,$ad_sex,$ad_email,$ad_remarks);
        if ($result>0) {
             var_dump ($_POST);
           } else {
             echo "操作失败";
           }
   }
   /**
    * 修改班主任
    * @return [type] [description]
    */
       public function editheadmaster(){
         $Id =  input('post.Id');
        $ad_number = input('post.number');
        $ad_name = input('post.name');
        $ad_sex = input('post.sex');
        $ad_email = input('post.email');
        $ad_remarks = input('post.remarks');
        $major = model('HeadmasterModel');
        $result = $major->editheadmaster($Id,$ad_number,$ad_name,$ad_sex,$ad_email,$ad_remarks);
        if ($result) {
             echo "操作成功";
           } else {
             echo "操作失败";
           }
    }
    /**
     * 删除班主任
     * @return [type] [description]
     */
    public function deleteheadmaster(){
        $ids = input('post.ids');
        $major = model('HeadmasterModel');
       $result = $major->deleteheadmaster($ids);
       if ($result) {
         return $result;
       } else {
         return 0;
       }
    }
    /**
     * 返回班级成员
     * @return [type] [description]
     */
    public function student(){
        $id=input('get.classid');
        $page = isset($_POST['page'])?intval($_POST['page']):1;//默认页码
        $rows = isset($_POST['rows'])?intval($_POST['rows']):5;//默认行数
        $classes = model('StudentModel');
        $result = $classes->retrievestudent($id,$page,$rows);
        $result = json_encode($result);
        $total = $classes->countstudent();
        $result = substr($result, 0, -1);
        $result = '{"total" : '.$total.', "rows" : '.$result.']}';
        // var_dump($result);
        echo $result;
    }
    /**
     * 添加学生
     * @return [type] [description]
     */
    public function addstudent(){
        $class_Id = input('post.class_Id');
        $nt_number = input('post.nt_number');
        $nt_name = input('post.nt_name');
        $nt_sex = input('post.nt_sex');
        $nt_idnumber = input('post.nt_idnumber');
        $nt_email = input('post.nt_email');
        $nt_remarks = input('post.nt_remarks');
        $major = model('StudentModel');
          $result = $major->addStudent($class_Id,$nt_number,$nt_name,$nt_sex,$nt_idnumber,$nt_email,$nt_remarks);
        if ($result>0) {
             echo "操作成功";
           } else {
             echo "操作失败";
           }
    }
    /**
     * 修改学生
     * @return [type] [description]
     */
    public function editstudent(){
        $Id =  input('post.Id');
        $nt_number = input('post.nt_number');
        $nt_name = input('post.nt_name');
        $nt_sex = input('post.nt_sex');
        $nt_idnumber = input('post.nt_idnumber');
        $nt_email = input('post.nt_email');
        $nt_remarks = input('post.nt_remarks');
        $student = model('StudentModel');
        $result = $student->editstudent($Id,$nt_number,$nt_name,$nt_sex,$nt_idnumber,$nt_email,$nt_remarks);
        if ($result) {
             echo "操作成功";
           } else {
             echo "操作失败";
           }
    }
    /**
     * 删除学生
     * @return [type] [description]
     */
    public function deletestudent(){

        $ids = input('post.ids');
        $student = model('studentModel');
        $result = $student->deletestudent($ids);
       if ($result) {
         echo "$result";
       } else {
         echo "0";
       }
    }
    //秘书处
    public function Secretariat(){
        $message = model("Secretariat");
        $data = $message->retrieve();
        $this->assign("message",$data);
        return $this->fetch('secretariat');
    }
    //接受秘书处信息
    public function Secretariatmessage(){
        $message = model("Secretariat");
        $res = $message->modify();
         if($res){
         $this->success('修改成功','Index/secretariat');
        }else{
          $this->error('修改失败','Index/secretariat');
        }
    }
    //学生会
    public function studentunion(){
        return $this->fetch('studentunion');
    }
     public function studentunionmessage(){
        $sort =  input('post.sort');
        $page = isset($_POST['page'])?intval($_POST['page']):1;//默认页码
        $rows = isset($_POST['rows'])?intval($_POST['rows']):5;//默认行数
        $studentunion = model('Studentunion');
        $result = $studentunion->retrieveStudentunion($page,$rows,$sort);
        $result = json_encode($result);
        $total = $studentunion->countstudentunion();
        $result = substr($result, 0, -1);
        $result = '{"total" : '.$total.', "rows" : '.$result.']}';
    // var_dump($result);
    echo $result;

    }
    //添加学生会
    public function addstudentunion(){
        $on_department = input('post.on_department');
        $on_number = input('post.on_number');
        $on_email = input('post.on_email');
        $on_remarks = input('post.on_remarks');
        $studentunion = model('Studentunion');
          $result = $studentunion->addstudentunion($on_department,$on_number,$on_email,$on_remarks);
        if ($result>0) {
             echo "操作成功";
           } else {
             echo "操作失败";
           }
    }
    public function editstudentunion(){
        $id = input('post.Id');
        $on_department = input('post.on_department');
        $on_number = input('post.on_number');
        $on_email = input('post.on_email');
        $on_remarks = input('post.on_remarks');
         $studentunion = model('Studentunion');
          $result = $studentunion->editstudentunion($id,$on_department,$on_number,$on_email,$on_remarks);
        if ($result) {
             echo "操作成功";
           } else {
             echo "操作失败";
           }
    }
    public function deletestudentunion(){
        $ids = input('post.ids');
        $studentunion = model('Studentunion');
        $result = $studentunion->deletetstudentunion($ids);
       if ($result) {
         return $result;
       } else {
         return 0;
       }
    }
    //联系我们
    public function contact(){
        return $this->fetch();
    }
    public function signout(){
        var_dump("expression");
       $this->redirect('Index/Index/clearSession');
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
