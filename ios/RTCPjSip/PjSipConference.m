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
    
    return self;
}


-(void)addCall:(PjSipCall*) call {
    call.isConference = true;
    self.calls[@(call.id)] = call;
}

-(void)removeCall:(PjSipCall*) call {
    call.isConference = false;
    [call.conferencePeers removeAllObjects];
    [self.calls removeObjectForKey:@(call.id)];
    [call hold];
}

-(void)start {
    for (NSString *key in self.calls) {
        PjSipCall *call = self.calls[key];
        call.conferencePeers = self.calls;
        if (call.isHeld) {
            [call unhold];
        }
    }
}

-(void)stop {
    for (NSString *key in self.calls) {
        PjSipCall *call = self.calls[key];
        [self removeCall:call];
    }
}

@end
