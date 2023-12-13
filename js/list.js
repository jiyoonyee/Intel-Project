const materialValue = document.querySelector('#material');
const plusBtn = document.getElementById('addMaterial');
const graybox = document.querySelector('.graybox');
const removeAll = document.querySelector('.removeall');
const getRecommand = document.querySelector('.result')

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "재료를 입력하면 간단한 요리를 추천해주는 나만의 요리사"
    },
    {
      "role": "user",
      "content": "계란,쌀,간장으로 할 수 있는 간단한 요리"
    },
    {
      "role": "assistant",
      "content": "재료:\n계란 2개\n쌀 500g\n간장 2스푼\n소금 10g\n\n요리방법:\n1. 후라이팬에 밥이랑 계란 볶기\n2. 소금으로 간 하기\n3. 간장을 뿌려 마무리 하기"
    }
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

console.log(response)





const materialHandler = () => {
  if(materialValue.value === '') {
    alert('먼저 재료를 입력해주세요.');
  } else {
    
    const $div = document.createElement('div');
    $div.className = "material-items"
    const $button = document.createElement('button');
    
    $div.textContent = materialValue.value;
    $button.textContent = 'X';
    materialValue.value = '';

    // 클릭 이벤트 리스너를 추가하여 버튼을 클릭했을 때의 동작을 정의
    $button.addEventListener('click', () => {
      // 해당 div를 삭제
      graybox.removeChild($div);
    });
    
    $div.append($button);
    graybox.append($div);
  }
}

// 엔터키나 더하기 버튼 눌렀을 때 추가하기
plusBtn.addEventListener("click", materialHandler);
document.addEventListener("keydown", function(event) {
  // Enter 키의 'key'는 "Enter"입니다.
  if (event.key === "Enter") {
    materialHandler();
  }
});

const removeAllItems = () => {
  if(!confirm('정말 모든 아이템을 삭제하시겠습니까?')){
    return;
  }
  if (graybox.children.length) {
      while (graybox.firstChild) {
      graybox.removeChild(graybox.firstChild);
    }
  } else {
    alert('삭제할 아이템이 없습니다.')
  }
}

removeAll.addEventListener("click", removeAllItems)

const noMaterials = () => {
  if (graybox.children.length) {
    console.log('Okay');
  } else {
    alert('먼저 재료를 입력해주세요.')
    event.preventDefault();
  }
}


// getRecommand.addEventListener("click", noMaterials)

