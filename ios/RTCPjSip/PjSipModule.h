#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface PjSipModule : RCTEventEmitter <RCTBridgeModule>

- (void)sendEvent:(NSString *)eventName body:(id)body;

@end
