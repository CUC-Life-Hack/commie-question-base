import fuzzy from 'fuzzysort';
import * as _ from 'lodash';
import * as Ne from '@nianyi-wang/element';

let questionBase = null;

const searchConfig = {
	limit: Infinity,
	key: '0'
};

function MakeResult(result) {
	return Ne.Create('div', {
		classes: 'question',
		children: [
			Ne.Create('p', {
				html: fuzzy.highlight(result)
			}),
			Ne.Create('ul', {
				classes: 'options',
				children: result.obj[1].map(option => Ne.Create('li', {
					classes: _.filter(['option', option[1] && 'correct']),
					text: option[0]
				}))
			})
		]
	});
}

window.LoadQuestionBase = async function() {
	const name = document.getElementById('question-base').value;
	if(!name)
		questionBase = null;
	else {
		const response = await fetch(`question-base/${name}.json`);
		const str = await response.text();
		const json = JSON.parse(str);
		questionBase = json;
	}
	OnSearch();
};

function OnSearch() {
	const $result = document.getElementById('result');
	Ne.Clear($result);
	if(questionBase === null) {
		$result.innerText = '请先选择题库！';
		return;
	}
	const query = document.getElementById('search').value;
	if(!/\S/.test(query))
		return;
	for(const result of fuzzy.go(query, questionBase, searchConfig))
		$result.appendChild(MakeResult(result));
}
window.OnSearch = _.throttle(OnSearch, 500);
