<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");

class Expenses
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
		sleep(3);
	}

	public function formData($key, $default=NULL)
	{
		return (isset($this->formData[$key]) && $this->formData[$key])? $this->formData[$key]: $default; 
	}

	public function getExpenses()
	{
		$jsonData = file_get_contents(self::JSON_PATH);
		$expenses = ($jsonData)? json_decode($jsonData, true): [];
		return ($expenses)? $expenses: [];
	}

	public function addExpense($expense)
	{
		$expenses 	= $this->getExpenses();
		$expenses[] = $expense;
		file_put_contents(self::JSON_PATH, json_encode($expenses));
	}

	public function getExpense($id)
	{
		$expenses = $this->getExpenses();
		foreach($expenses as $e => $expense)
		{
			if($expense['id'] == $id)
			{
				return $expense;
			}	
		}
		return NULL;
	}

	public function updateExpense($id, $expenseData)
	{
		$expenses = $this->getExpenses();
		$index = NULL;
		foreach($expenses as $e => $expense)
		{
			if($expense['id'] == $id)
			{
				$index = $e;
				break;
			}	
		}
		if($index !== NULL)
		{
			$expenses[$index] = array_merge(['id' => (int)$id], $expenseData);
			file_put_contents(self::JSON_PATH, json_encode($expenses));
			return true;
		}
		return false;
	}

	public function deleteExpense($id)
	{
		$expenses = $this->getExpenses();
		$index = NULL;
		foreach($expenses as $e => $expense)
		{
			if($expense['id'] == $id)
			{
				$index = $e;
				break;
			}	
		}
		if($index !== NULL)
		{
			unset($expenses[$index]);
			$expenses = array_values($expenses);
			file_put_contents(__DIR__.DIRECTORY_SEPARATOR.'data.json', json_encode($expenses));
			return true;
		}
		return false;
	}

	public function request()
	{
		$id = str_replace('/expenses/', '', $_SERVER['REQUEST_URI']);
		if(strpos($_SERVER['HTTP_HOST'], 'local.') !== false)
		{
			$id = str_replace('/', '', $_SERVER['REQUEST_URI']);
		}
		if($id)
		{
			$id = (int)$id;
			if($_SERVER['REQUEST_METHOD'] == 'POST')
			{
				$title 	= $this->formData('title', 'Title'.time());
				$amount = $this->formData('amount', '0');
				$date 	= $this->formData('date', date('Y-m-d H:i:s'));
				if($this->updateExpense($id, [
										'title' => $title,
										'amount' => $amount,
										'date' => $date
									])) {
					$this->response['status'] = 'success';
				}
				else
				{
					$this->response['message'] = 'Expense not found';
				}
			}
			if($_SERVER['REQUEST_METHOD'] == 'GET')
			{
				$expense = $this->getExpense($id);
				if($expense)
				{
					$this->response['status'] = 'success';
					$this->response['data'] = $expense;
				}
				else
				{
					$this->response['message'] = 'Expense not found';
				}
			}
			else if($_SERVER['REQUEST_METHOD'] == 'DELETE')
			{
				if($this->deleteExpense($id))
				{
					$this->response['status'] = 'success';
				}
				else
				{
					$this->response['message'] = 'Expense not found';
				}
			}
		}
		else
		{
			if($_SERVER['REQUEST_METHOD'] == 'GET')
			{
				$this->response['status'] = 'success';
				$this->response['data']   = $this->getExpenses();
			}
			else if($_SERVER['REQUEST_METHOD'] == 'POST')
			{
				$title 	= $this->formData('title', 'Title'.time());
				$amount = $this->formData('amount', '0');
				$date 	= $this->formData('date', date('Y-m-d H:i:s'));

				$newId = abs(crc32(uniqid()));
				$this->addExpense([
					'id' 		=> $newId,
					'title' 	=> $title,
					'amount' 	=> $amount,
					'date' 		=> $date,
				]);
				$this->response['status'] = 'success';
				$this->response['data'] 	= $newId;
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

$expenses = new Expenses();
$expenses->request()->response();