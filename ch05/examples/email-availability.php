$output = array();
$email = $_GET['username'];

$taken = db_result(db_query("SELECT COUNT(u.email) FROM {users} u WHERE u.email = '%s'", $email));

if ($taken) {
	$output = true;
)
else {
	$output = false;
}

print $output;