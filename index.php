$serviceCode = $_POST['serviceCode'];
$phoneNumber = ltrim($_POST['phoneNumber']);
$text = $_POST['text'];

//check if the text is empty to start a new session

if($text == ""){
    $response = "CON Welcome to moyo wallet. Please choose an option:\n";
    $response .= "1. Check Balance\n";
    $response .= "2. Buy Airtime\n";
    $response .= "3. Data Plans\n";
}else{
    //split the text to get the user's response
    $textArray = explode("*", $text);

    switch ($textArray[0]) {
        case "1":
            //check balance
            $response = "END Your balance is KES 1,000.";
            break;
        case "2":
            //buy airtime
            if (count($textArray) == 1) {
                $response = "CON Enter amount to buy airtime:";
            } elseif (count($textArray) == 2) {
                $amount = $textArray[1];
                $response = "END You have successfully bought KES $amount airtime.";
            }
            break;
        case "3":
            //data plans
            if (count($textArray) == 1) {
                $response = "CON Choose a data plan:\n";
                $response .= "1. 100MB - KES 50\n";
                $response .= "2. 500MB - KES 200\n";
                $response .= "3. 1GB - KES 350\n";
            } elseif (count($textArray) == 2) {
                $plan = $textArray[1];
                switch ($plan) {
                    case "1":
                        $response = "END You have successfully purchased 100MB data plan.";
                        break;
                    case "2":
                        $response = "END You have successfully purchased 500MB data plan.";
                        break;
                    case "3":
                        $response = "END You have successfully purchased 1GB data plan.";
                        break;
                    default:
                        $response = "END Invalid option selected.";
                        break;
                }
            }
            break;
        default:
            $response = "END Invalid option selected.";
            break;
    }