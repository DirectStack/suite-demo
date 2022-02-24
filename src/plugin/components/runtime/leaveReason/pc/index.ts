// 这个会报错，提示window不存在
// import 'dingtalk-jsapi/entry/union';
// import alert from 'dingtalk-jsapi/api/device/notification/alert';
import { getSdk } from '../../../../api/sdk';

Component({
  data: {
    viewMode: false,
    val: '',
  },
  didMount() {
    const form = getSdk().form;
    const field = form.getFieldByBizAlias('leaveReason');
    const viewMode = field?.getProp('viewMode') || false;
    const val =  field?.getValue();
    const extendValue = field?.getExtendValue();
    const key = field?.getProp('id');

    console.log('getSdk()',getSdk());
    this.setData({
      viewMode,
      val
    });

    const bizAsyncData = [
      {
        key,
        bizAlias: 'leaveReason',
        extendValue,
        value: val,
      },
    ];

    getSdk().spi
      .refreshData({
        modifiedBizAlias:['leaveReason'], // spi接口要改动的是leaveReason的属性值
        bizAsyncData
      })
      .then(res => {
        console.log('refreshData', res)
      });
  },
  methods: {
    // handleClick() {
    //   alert({
    //     message: '点击弹窗',
    //     title: 'title',
    //     buttonName: '知道了'
    //   });
    // },
    handleClick() {
      console.log('getSdk123');
      // 
      getSdk().jsapi.alert({
        message: '点击弹窗',
        title: 'title',
        buttonName: '知道了'
      });
    },
    handleInput(e: any) {
      console.log('getSdk()',getSdk());
      const inputValue =  e.detail.value;
      getSdk().form.setFieldValue('leaveReason', inputValue, true);
    },
  },
});
