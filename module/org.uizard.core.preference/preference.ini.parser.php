<?

// Parse with sections
$ini_array = parse_ini_file("../../uizard.ini", false);
echo serialize($ini_array);
?>
