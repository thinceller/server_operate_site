import aws from 'aws-sdk';

aws.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: 'ap-northeast-1'
})

class AwsService {
  constructor() {
    this.lambda = new aws.Lambda();
    this.lambdaName = 'minecraft_server_operate'
  }

  /**
   * Lambda関数を実行
   * @param {string} functionName - Lambda関数名
   * @param {Object} payload - Lambda関数に渡すパラメータ
   * @return {Promise} 関数実行結果を返す
   */
  invokeLambda = (functionName, payload) => {
    const params = {
      FunctionName: functionName,
      Payload: JSON.stringify(payload)
    };
    return this.lambda.invoke(params).promise();
  };

  /**
   * サーバーの状態を取得
   * @return {Promise} レスポンス
   */
  getServerStatus = () => {
    const payload = { action: 'status' }
    return this.invokeLambda(this.lambdaName, payload)
  };

  /**
   * 引数のアクションに応じてサーバーを操作
   * @param {string} action - サーバーの起動or停止 'start'or'stop'
   * @return {Promise} レスポンス
   */
  operateServer = action => {
    const payload = { action: action };
    return this.invokeLambda(this.lambdaName, payload);
  };
}

const awsService = new AwsService();
export default awsService;
