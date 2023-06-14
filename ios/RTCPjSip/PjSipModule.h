#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface PjSipModule : RCTEventEmitter <RCTBridgeModule>

+(PjSipModule *)getInstance;

- (void)sendEventName:(NSString *)eventName body:(id)body;

@end
