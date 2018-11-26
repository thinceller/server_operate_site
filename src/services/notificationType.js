const notificationType = type => {
  let title, message, level;

  switch (type) {
    case 'clipboard':
      title = 'クリップボードに保存完了';
      message = 'IPアドレスをクリップボードに保存しました！';
      level = 'success';
      break;
    case 'starting':
      title = 'サーバー起動中';
      message = 'サーバーを起動しています';
      level = 'info';
      break;
    case 'started':
      title = 'サーバー起動完了';
      message = 'サーバー起動完了しました！';
      level = 'success';
      break;
    case 'stopping':
      title = 'サーバー停止中';
      message = 'サーバーを停止しています';
      level = 'info';
      break;
    case 'stopped':
      title = 'サーバー停止完了';
      message = 'サーバー停止完了しました！';
      level = 'success';
      break;
    default:
      break;
  }
  return {
    title,
    message,
    level
  };
}

export default notificationType;
