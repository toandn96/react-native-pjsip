#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface PjSipModule : RCTEventEmitter <RCTBridgeModule>

+(PjSipModule *)getInstance;

@end
