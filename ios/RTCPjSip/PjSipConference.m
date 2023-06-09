//
//  PjSipConference.m
//  ASN1Decoder
//
//  Created by Andre on 09/06/23.
//

#import "PjSipConference.h"
#import "PjSipCall.h"

@implementation PjSipConference


+ (instancetype) instance {
    static PjSipConference *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[PjSipConference alloc] init];
    });
    
    return sharedInstance;
}

- (instancetype) init {
    self = [super init];
    self.calls = [[NSMutableDictionary alloc] initWithCapacity:4];
}


-(void)addCall:(PjSipCall*) call {
    call.isConference = true;
    self.calls[@(call.id)] = call;
}

-(void)start {
    for (NSString *key in self.calls) {
        PjSipCall *call = self.calls[key];
        if (call.isHeld) {
            [call unhold];
        }
    }
    
    for (NSString *key in self.calls) {
        pjsua_conf_port_id portId =  pjsua_call_get_conf_port(key);
        
        for (NSString *key2 in self.calls) {
            if (call.id != key) {
                pjsua_conf_port_id portId2 =  pjsua_call_get_conf_port(key2);
                pjsua_conf_connect(portId2, portId);
            }
        }
    }
}

@end
