const util = {
    delay: (ms: number) => {
        // ms 만큼 딜레이
        return new Promise<void>((res) => {
            const timer = setTimeout(() => {
                res();
                clearTimeout(timer);
            }, ms);
        });
    },
    checkScript: (name: string, src: string, callback: any, defer?: boolean) => {
        // name : script에 포함된 이름
        // src : script내부에 사용되는 src
        // callback : script 로드 완료 후 발생되는 콜백
        // defer : defer 필요한 경우 처리
        const scriptList = document.getElementsByTagName("script");

        let script;

        for (let i = 0; i < scriptList.length; i++) {
            if (scriptList[i].src.includes(name)) {
                script = scriptList[i];
            }
        }

        if (script) {
            try {
                callback();
            } catch (e) {
                util.delay(1000).then(() => {
                    callback();
                });
            }
        } else {
            script = document.createElement("script");

            script.async = true;

            if (defer) {
                script.defer = true;
            }

            script.src = src;

            document.head.appendChild(script);

            script.onload = () => {
                callback();
            };
        }

        return script;
    },
    removeScript: (script: any) => {
        const headChildren: any = document.head.children;

        for (let i = 0; i < headChildren.length; i++) {
            if (headChildren[i].src === script.src) {
                // script 제거
                document.head.removeChild(script);
            }
        }
    },
};

export default util;
