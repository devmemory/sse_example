# 폴더 구조

## server

### src/api
- sse_api.js : sse, api 정의

### src/controllers
- sse_controller.js : sse 로직 처리

### src/index : node express 기본 셋팅

## web(client)

### src/assets : asset 들 (현재 미사용)

### src/components
- chart/chart_component.tsx : chart 및 sse 구현 부분
- chart/custom_chart.js : chart cdn부분 및 기본 셋팅
- common_btn : 공통 버튼

### src/util
- util.ts : 공통 유틸

### src/index : entry point