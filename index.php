
<?php 
$myzipname='';
function generateRandomString($length = 6) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
if($_POST)
{
   $file='index2.js';

   $content=file($file);

   foreach($content as $key=>$value){

   if(strpos($value,'FB_token'))
   {
    $content[$key]=str_replace('FB_token',$_POST['token'],$content[$key]);
   }
   elseif(strpos($value,'FB_access'))
   {
     $content[$key]=str_replace('FB_access',$_POST['access'],$content[$key]);
   }
   elseif(strpos($value,'welcome message'))
   {
     $content[$key]=str_replace('welcome message',$_POST['welcome'],$content[$key]);
   }

   elseif(strpos($value,'response to welcome'))
   {
      
     $content[$key]=str_replace('response to welcome',$_POST['welcomeres'],$content[$key]);

   }

   elseif(strpos($value,'start conversation'))
   {
     $content[$key]=str_replace('start conversation',$_POST['conversecont'],$content[$key]);
   }
   elseif(strpos($value,'response to start conversation'))
   {
     $content[$key]=str_replace('response to start conversation',$_POST['conversecontres'],$content[$key]);
   }
    elseif(strpos($value,'continue conversation'))
   {
     $content[$key]=str_replace('continue conversation',$_POST['justanoconverse'],$content[$key]);
   }
    elseif(strpos($value,'response to continue conversation'))
   {
     $content[$key]=str_replace('response to continue conversation',$_POST['justanoconverseres'],$content[$key]);
   }

 }

  $fp=fopen('index.js','w');

  foreach($content as $key=>$value)
  {
    fwrite($fp,$value);
  }

  fclose($fp);
 
 // Get real path for our folder
$rootPath = realpath('../dronenot-facebook');

// Initialize archive object
$zip = new ZipArchive();
$myzipname= generateRandomString();
$zip->open($myzipname.'.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE);
 
// Initialize empty "delete list"
$filesToDelete = array();

// Create recursive directory iterator
/** @var SplFileInfo[] $files */
$files = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($rootPath),
    RecursiveIteratorIterator::LEAVES_ONLY
);

foreach ($files as $name => $file)
{
    // Skip directories (they would be added automatically)
    if (!$file->isDir() and $file->getFilename() != 'index.php' and $file->getFilename()!='index2.js' and $file->getFilename()!='delete.php')
    {
        // Get real and relative path for current file
        $filePath = $file->getRealPath();
        $relativePath = substr($filePath, strlen($rootPath) + 1);

        // Add current file to archive
        $zip->addFile($filePath, $relativePath);

       
    }
}

// Zip archive will be created only after closing object
$zip->close();



}

?>

<!DOCTYPE html>
<html>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.bundle.min.js" integrity="sha384-feJI7QwhOS+hwpX2zkaeJQjeiwlhOP+SdQDqhgvvo1DsjtiSQByFdThsxO669S2D" crossorigin="anonymous"></script>

<style>
* {
  box-sizing: border-box;
}

body {
  background-color: #f1f1f1;
}

#regForm {
  background-color: #ffffff;
  margin: 100px auto;
  font-family: Raleway;
  padding: 40px;
  width: 70%;
  min-width: 300px;
}

h1 {
  text-align: center;  
}

input {
  padding: 10px;
  width: 100%;
  font-size: 17px;
  font-family: Raleway;
  border: 1px solid #aaaaaa;
}

/* Mark input boxes that gets an error on validation: */
input.invalid {
  background-color: #ffdddd;
}

/* Hide all steps by default: */
.tab {
  display: none;
}

button {
  background-color: #4CAF50;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 17px;
  font-family: Raleway;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

#prevBtn {
  background-color: #bbbbbb;
}

/* Make circles that indicate the steps of the form: */
.step {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbbbbb;
  border: none;  
  border-radius: 50%;
  display: inline-block;
  opacity: 0.5;
}

.step.active {
  opacity: 1;
}

/* Mark the steps that are finished and valid: */
.step.finish {
  background-color: #4CAF50;
}
</style>
<body>
  
 
<form id="regForm" action=" " method="post">
  <h1>Create your facebook bot source code</h1>
  <div class="" style="display:none; text-align:center;" id="download">
  <?php if(is_file($myzipname.'.zip')){ ?>
   <a href="<?php echo $myzipname.'.zip';?>"  role="button"  class="btn btn-primary" download> DownLoad code source</a>
   <p id="counter"></p>
   <?php } ?>
   
 </div>
  <!-- One "tab" for each step in the form: -->
  <div class="tab"> Facebook Page Token and Access
    <p><input placeholder="Token" oninput="this.className = ''" name="token"></p>
    <p><input placeholder="Access" oninput="this.className = ''" name="access"></p>
  </div>
  <div class="tab">Start Conversation:
    <p><input placeholder="User says" oninput="this.className = ''" name="welcome"></p>
    <p><input placeholder="Bot replies" oninput="this.className = ''" name="welcomeres"></p>
  </div>
  <div class="tab">Conversation Continue
    <p><input placeholder="user says" oninput="this.className = ''" name="conversecont"></p>
    <p><input placeholder="bot replies" oninput="this.className = ''" name="conversecontres"></p>
    
  </div>
  <div class="tab">just another conversation
    <p><input placeholder="user says" oninput="this.className = ''" name="justanoconverse"></p>
    <p><input placeholder="bot replies" oninput="this.className = ''" name="justanoconverseres" type="text"></p>
  </div>
  <div style="overflow:auto;">
    <div style="float:right;">
      <button type="button" id="prevBtn" onclick="nextPrev(-1)">Previous</button>
      <button type="button" id="nextBtn" onclick="nextPrev(1)">Next</button>
    </div>
  </div>
  <!-- Circles which indicates the steps of the form: -->
  <div style="text-align:center;margin-top:40px;">
    <span class="step"></span>
    <span class="step"></span>
    <span class="step"></span>
    <span class="step"></span>
  </div>
</form>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
<script>
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the crurrent tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("regForm").submit();
   localStorage.setItem('download',1);
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

window.onload=function()
{
  $("#test").click(function(){
    alert("tes");
  });
  if(localStorage.getItem('download')>0)
  {
    //alert("ok");
    document.getElementById("download").style.display="block";

    

  }

}
if(localStorage.getItem('download')>0)
{


var timetoDelete=setInterval(function(){ 
      var count=60;
      document.getElementById("counter").innerHTML=' you have '+count+' seconds to download this file !';
      count-=1;
      ; }, 1000);
  setTimeout(function(){
   clearInterval(timetoDelete);
   $.post('delete.php');
   document.getElementById("download").style.display="none";
  },61000);
}

</script>

</body>
</html>