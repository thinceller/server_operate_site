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
   * @return {Object} 関数実行結果を返す
   */
  invokeLambda = (functionName, payload) => {
    const params = {
      FunctionName: functionName,
      Payload: JSON.stringify(payload)
    };
    return this.lambda.invoke(params).promise();
  };

  getServerStatus = () => {
    const payload = { action: 'status' }
    return this.invokeLambda(this.lambdaName, payload)
  }
}

const awsService = new AwsService();
export default awsService;
