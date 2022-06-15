import questions from './questions.json';
import fuzzy from 'fuzzysort';
import { throttle } from 'lodash';

const searchConfig = {
	limit: 5,
	key: '0'
};

const $result = document.getElementById('result');

const $ = (tag, parent = null) => {
	const el = document.createElement(tag);
	if(parent)
		parent.appendChild(el);
	return el;
}

function MakeResult(result) {
	const question = result.obj;
	const $question = $('div', $result);
	$question.classList.add('question');
	const $text = $('p', $question);
	$text.innerHTML = fuzzy.highlight(result);
	const $options = $('ul', $question);
	$options.classList.add('options');
	for(const option of question[1]) {
		const $option = $('li', $options);
		$option.classList.add('option');
		$option.innerText = option[0];
		if(option[1])
			$option.classList.add('correct');
	}
}

const $search = document.getElementById('search');
function OnSearch() {
	const search = $search.value + '';
	const results = fuzzy.go(search, questions, searchConfig);
	$result.innerHTML = '';
	results.forEach(MakeResult);
}
OnSearch = throttle(OnSearch, 500);

['keyup', 'input', 'change'].forEach(ev => $search.addEventListener(ev, OnSearch));
window.onload = OnSearch;
