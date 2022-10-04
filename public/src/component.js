const createEl = domStr => {
    // template 엘리멘트는 HTML에 즉시 그려지지 않지만, 언제든 그려질 수 있는 엘리멘트를 만들고자 할 때 사용
    const $temp = document.createElement('template');
    $temp.innerHTML = domStr;
    
    // template 엘리멘트의 conetnt 프로퍼티로 개체를 호출하면 DocumentFragment라는 인터페이스를 반환
    // 해당 인터페이스는 부모 없이 독립적으로 존재하는 Document를 저장할 때 사용됨
    return $temp.content;
};

const fetchData = async url => {
    // fetch() 함수는 API 요청을 하고, 그 결과를 Promis 형태의 객체로 반환
    const res = await fetch(url);

    const json = await res.json();
    return json;
};

export const Home = async () => {
    const { title, content } = await fetchData('/api/home');
    return createEl(`<h1>${title}</h1><p>${content}</p>`);
};

export const About = async () => {
    const { title, content } = await fetchData('/api/about');
    return createEl(`<h1>${title}</h1><p>${content}</p>`);
};

export const NotFound = async () => { return createEl(`<h1>404 NotFound</h1>`)};