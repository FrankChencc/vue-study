import Vue from 'vue';

// 可以动态创建组件实例并挂载至body
export function create(Component, props) {
    // 1.组件实例怎么创建？
    // 方式1：组件配置对象 =》 Ctor = Vue.extend(Component)变成构造函数
    // =》 new Ctor()
    const Ctor = Vue.extend(Component);
    let comp = new Ctor({
        propsData: props
    });
    console.log(comp);
    
    // 问题1：$props, $option.props 和 _props有什么区别，问什么只有赋值给_props才正确
    comp._props = props;

    /* 问题2: 下面如果写成：

        let element = comp.$mount().$el;
        console.log(element);
        document.body.appendChild(element);
    
        log 出来是一个占位符<!-- -->
        执行下面的appendChild也不报错
        页面元素也能正常显示，为什么？
    */
    let element = comp.$mount();
    document.body.appendChild(element.$el);

    // 淘汰机制
    comp.remove = () => {
        /*问题3: 如果按照上面问题2的操作后，在这里直接remove那个空的占位符element：
            
            document.body.removeChild(element);

            这时候就会报错，那么为什么
            document.body.appendChild(element)都可以;
            document.body.removeChild(element)就不行了？
        */
        console.log(element.$el);
        // 删除dom
        document.body.removeChild(element.$el);

        // 销毁组件
        comp.$destroy();
    };

    // 返回Component组件实例
    return comp;

}