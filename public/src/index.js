import { Home, About, NotFound } from './component.js';

const $root = document.querySelector('#root');
const $nav = document.querySelector('#nav');
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
];

const render = async path => {
    const _path = path ?? window.location.pathname;

    try {
        // 전달 받은 path가 routes에 존재하면 해당 컴포넌트를 불러오고, 존재하지 않다면 NotFound 컴포넌트를 불러옴
        const component = routes.find(route => route.path === _path)?.component || NotFound;
        
        // 원래 그려져있던 요소를 불러온 컴포넌트로 변경
        $root.replaceChildren(await component());
    } catch (err) {
        console.error(err);
    }
};

$nav.addEventListener('click', e => {
    if (!e.target.matches('#nav > li > a')) return;
    e.preventDefault();
    const path = e.target.getAttribute('href');
    if (window.location.pathname === path) return;
    window.history.pushState(null, null, path);
    render(path);
});

// 앞으로 가기/뒤로 가기 이벤트 발생 시 현재 위치(window.location.pathname)을 참조해 뷰를 전환
window.addEventListener('popstate', () => {
    console.log('[popstate]', window.location.pathname);
    render();
});


// 웹 페이지가 처음 로딩 됐을 때 위치(window.location.pathname)을 확인해 뷰 전환
window.addEventListener('DOMContentLoaded', () => {
    render();
});