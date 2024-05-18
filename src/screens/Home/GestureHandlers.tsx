import { useAnimatedGestureHandler, withTiming } from 'react-native-reanimated';
import { END_WIDTH, START_WIDTH, WIDTH } from '../../constants/config';

export const handleGesture = (sheetAnimVal: any, activeSheet: any) => {
      return useAnimatedGestureHandler({
            onStart: (_, ctx) => {
                  ctx.x = sheetAnimVal.value;
            },
            onActive: (event, ctx: any) => {
                  sheetAnimVal.value = event.translationX + ctx.x;
            },
            onEnd: (event, ctx) => {
                  if (
                        (activeSheet.value === 1 && event.translationX > 0) ||
                        (activeSheet.value === 3 && event.translationX < 0)
                  ) {
                        sheetAnimVal.value = ctx.x;
                  } else if (event.absoluteX > WIDTH / 2 && activeSheet.value === 2) {
                        sheetAnimVal.value = withTiming(START_WIDTH);
                        activeSheet.value = 1;
                  } else if (event.translationX < -WIDTH / 2 && activeSheet.value === 2) {
                        sheetAnimVal.value = withTiming(END_WIDTH);
                        activeSheet.value = 3;
                  } else if (activeSheet !== 2) {
                        sheetAnimVal.value = withTiming(0);
                        activeSheet.value = 2;
                  }
            },
      });
};