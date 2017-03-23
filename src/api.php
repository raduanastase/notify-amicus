<?php

$MAILCHIMP_API_KEY = "******************-us15";

$MAILCHIMP_API_SERVER = explode('-', $MAILCHIMP_API_KEY)[1];

$MAILCHIMP_API_URL = "https://" . $MAILCHIMP_API_SERVER . ".api.mailchimp.com/3.0/";

/**
 * Makes a http get call to Mailchimp server
 * @param $endpoint_path
 * @return a json with data found
 */
function mailchimp_call($endpoint_path)
{
    global $MAILCHIMP_API_KEY;
    global $MAILCHIMP_API_URL;
    $api_url = $MAILCHIMP_API_URL . $endpoint_path;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Accept: application/vnd.api+json',
        'Content-Type: application/vnd.api+json',
        'Authorization: Basic ' . $MAILCHIMP_API_KEY
    ));
    curl_setopt($ch, CURLOPT_USERAGENT, 'DrewM/MailChimp-API/3.0 (github.com/drewm/mailchimp-api)');
    curl_setopt($ch, CURLOPT_VERBOSE, 0);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);
    curl_setopt($ch, CURLOPT_ENCODING, '');
    curl_setopt($ch, CURLINFO_HEADER_OUT, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_URL, $api_url);
    $response = curl_exec($ch);

    if ($response == false) {
        trigger_error('Curl to URL ' . $api_url . ' has the error: ' . curl_error($ch), E_USER_WARNING);
    }
    curl_close($ch);

    return $response;
}

/**
 * Takes all mailing lists from MailChimp
 * @return an array with the lists
 */
function get_mailchimp_lists()
{
    $lists = mailchimp_call("lists");

    return json_decode($lists, true);
}

/**
 * Takes the image src and description for a specific list, calling MailChimp API
 * @param $mailchimp_list_id
 * @return array with an image string and a description for given id
 */
function get_image_and_description_for_list($mailchimp_list_id)
{
    $list_info = json_decode(mailchimp_call("lists/" . $mailchimp_list_id . "/signup-forms"), true);

    $list_info_result = array(
        'image' => '',
        'description' => ''
    );

    if (empty($list_info)) {
        return $list_info_result;
    }

    $list_info_result['image'] = $list_info["signup_forms"]["0"]["header"]["image_url"];
    $list_contents = $list_info["signup_forms"]["0"]["contents"];

    foreach ($list_contents as $form_content) {
        if ($form_content["section"] == 'signup_message') {
            $list_info_result['description'] = $form_content['value'];
        }
    }

    return $list_info_result;
}

/**
 * Build projects or lists info from mailchimp mailing lists
 *
 * For each list
 * - take image and description from mailchimp signup-form
 * - add url and title
 * - build an object corresponding to the list with id, title, image, description and URL
 *
 * @return array with all the projects with their data
 */
function build_projects_list()
{
    $built_list = array();
    $lists = get_mailchimp_lists()['lists'];

    if (!empty($lists)) {
        foreach ($lists as $list_mc) {
            $list_id = $list_mc['id'];
            $image_and_description = get_image_and_description_for_list($list_id);
            $list = array(
                'id' => $list_id,
                'title' => $list_mc['name'],
                'image' => $image_and_description['image'],
                'description' => $image_and_description['description'],
                'subscribe_link' => $list_mc['subscribe_url_long']
            );
            array_push($built_list, $list);
        }
    }

    return $built_list;
}

header('Content-Type: application/json');

$output = json_encode(build_projects_list(), JSON_PRETTY_PRINT);
$file = fopen("cache.json", "w");

fwrite($file, $output);
fclose($file);

echo $output;

?>