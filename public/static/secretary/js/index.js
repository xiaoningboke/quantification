 function addTab(title, url){
         if ($('#tt').tabs('exists', title)){
            $('#tt').tabs('select', title);
         } else {
            var content = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
            $('#tt').tabs('add',{
               title:title,
               content:content,
               closable:true
            });
         }
      }
      /*主页添加选项卡*/
      function addTab(title, url){
         console.log('');
         if ($('#tt').tabs('exists', title)){
            $('#tt').tabs('select', title);
         } else {
            var content = '<iframe  frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
            $('#tt').tabs('add',{
               title:title,
               content:content,
               closable:true,
   
            });
         }
      }

      $('#tt').tabs({
            fit:true,
         });

      /*帮助，联系我们*/
      $(function(){
            /*添加选项卡*/
         $('#a1').click(
            function(){

            addTab('帮助','help.html');
            
         });
         $('#a2').click(
            function(){

            addTab('联系我们','contact/index.html');
            
         });

         });