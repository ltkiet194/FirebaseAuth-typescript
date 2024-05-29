export function formatFirebaseTimestamp(timeServer: any) {
      const timestamp: any = new Date(timeServer.seconds * 1000 + timeServer.nanoseconds / 1000000);
      const now: any = new Date();
      const diffInMillis = now - timestamp;
      const diffInMinutes = Math.floor(diffInMillis / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInWeeks = Math.floor(diffInDays / 7);
      const diffInMonths = Math.floor(diffInDays / 30);

      let formattedDate;
      if (diffInDays <= 0) {
            const hours = timestamp.getHours();
            const minutes = timestamp.getMinutes();
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            if (diffInMillis < 60000) formattedDate = 'Just now';
            else if (diffInMinutes < 60) {
                  formattedDate = `${diffInMinutes} minutes ago`;
            } else if (diffInHours < 24) {
                  formattedDate = `${diffInHours} hours ago`;
            } else {
                  formattedDate = `Today ${formattedTime}`;
            }
      } else if (diffInDays < 7) {
            formattedDate = `${diffInDays} days ago`;
      } else if (diffInDays < 30) {
            formattedDate = `${diffInWeeks} weeks ago`;
      } else if (diffInMonths < 12) {
            formattedDate = `${diffInMonths} months ago`;
      } else {
            formattedDate = `${timestamp.getDate().toString().padStart(2, '0')}/${(timestamp.getMonth() + 1).toString().padStart(2, '0')}/${timestamp.getFullYear()}`;
      }

      return formattedDate;
}
export function getColorByRole(role?: string) {
      switch (role) {
            case 'Admin':
                  return 'red';
            case 'Moderator':
                  return 'blue';
            case 'Member':
                  return 'green';
            default:
                  return 'white';
      }
}