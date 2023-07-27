<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");

class Auth
{
	const JSON_PATH = __DIR__.DIRECTORY_SEPARATOR.'data.json';

	private $formData = NULL;

	private $response = [
		'status' 	=> 'failed',
		'data' 		=> NULL,
		'message' 	=> NULL
	];

	function __construct()
	{
		$this->formData = json_decode(file_get_contents("php://input"), true);
		//sleep(3);
	}

	public function formData($key, $default=NULL)
	{
		return (isset($this->formData[$key]) && $this->formData[$key])? $this->formData[$key]: $default; 
	}

	public function getUsers()
	{
		$jsonData = file_get_contents(self::JSON_PATH);
		$getUsers = ($jsonData)? json_decode($jsonData, true): [];
		return ($getUsers)? $getUsers: [];
	}

	public function checkEmailExist($email)
	{
		$users = $this->getUsers();
		foreach($users as $e => $user)
		{
			if($user['email'] == $email)
			{
				return $user;
			}	
		}
		return NULL;
	}

	public function register($user)
	{
		$users 	= $this->getUsers();
		$users[] = $user;
		file_put_contents(self::JSON_PATH, json_encode($users));
	}

	public function login($email, $password)
	{
		$users = $this->getUsers();
		foreach($users as $e => $user)
		{
			if($user['email'] == $email && $user['password'] == $password)
			{
				return $user;
			}	
		}
		return NULL;
	}

	public function request()
	{
		$type = str_replace('/auth/', '', $_SERVER['REQUEST_URI']);
		if(strpos($_SERVER['HTTP_HOST'], 'local.') !== false)
		{
			$type = str_replace('/', '', $_SERVER['REQUEST_URI']);
		}
		if($type && $_SERVER['REQUEST_METHOD'] == 'POST')
		{
			if($type == 'login')
			{
				$email 		= $this->formData('email');
				$password 	= $this->formData('password');
				if(filter_var($email, FILTER_VALIDATE_EMAIL) && strlen($password)>= 5)
				{
					$loginUser = $this->login($email, md5($password)); 
					if($loginUser)
					{
						$this->response['data'] 	= $loginUser;
						$this->response['status'] 	= 'success';
					}
					else
					{
						$this->response['message'] = 'Invalid email or password combination';
					}
				}
				else
				{
					$this->response['message'] = 'Invalid email or password combination';
				}
			}
			if($type == 'register')
			{
				$email 	  = $this->formData('email');
				$password = $this->formData('password');
				if(filter_var($email, FILTER_VALIDATE_EMAIL) && strlen($password)>= 7)
				{
					if(!$this->checkEmailExist($email))
					{
						$user = [
									'id' 		=> uniqid(),
									'email' 	=> $email,
									'password' 	=> md5($password)
								];
						$this->register($user);
						$this->response['status'] = 'success';
						$this->response['data'] = $user;
					}
					else
					{
						$this->response['message'] = 'Email already exist';
					}	
				}
				else
				{
					if(!filter_var($email, FILTER_VALIDATE_EMAIL))
					{
						$this->response['message'] = 'Invalid Email address';
					}
					else if(strlen($password) < 5)
					{
						$this->response['message'] = 'Password must be at least 5 characters';
					}
				}	
			}
		}
		return $this;
	}

	public function response()
	{
		if($this->response['status'] == 'failed')
		{
			http_response_code(400);
		}
		header('Content-Type: application/json');
		echo json_encode($this->response);
		exit;
	}
}

$auth = new Auth();
$auth->request()->response();