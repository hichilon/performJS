describe("Perform", function() {
  
	describe("perform", function() {
		it("is defined", function() {
			expect(perform).toBeDefined();
		});
	});
	
	describe("functions that should be undefined in the global scope", function() {
		describe("perform.loadTime", function() {
			it("should be undefined in the global scope", function() {
				expect(perform.loadTime).toBeUndefined();
			});
		});
		describe("perform.latency", function() {
			it("should be undefined in the global scope", function() {
				expect(perform.latency).toBeUndefined();
			});
		});
		describe("perform.connectTime", function() {
			it("should be undefined in the global scope", function() {
				expect(perform.connectTime).toBeUndefined();
			});
		});
		describe("perform.dnsLatency", function() {
			it("should be undefined in the global scope", function() {
				expect(perform.dnsLatency).toBeUndefined();
			});
		});
		describe("perform.documentLoad", function() {
			it("should be undefined in the global scope", function() {
				expect(perform.documentLoad).toBeUndefined();
			});
		});
		describe("perform.getData", function() {
			it("should be undefined in the global scope", function() {
				expect(perform.getData).toBeUndefined();
			});
		});
		describe("perform.lookUp", function() {
			it("should be undefined in the global scope", function() {
				expect(perform.lookUp).toBeUndefined();
			});
		});
		describe("perform.data", function() {
			it("should be undefined in the global scope", function() {
				expect(perform.data).toBeUndefined();
			});
		});
	});
	
	describe("perform.stats", function() {
		it("is defined in the global space", function() {
			expect(perform.stats).toBeDefined();
		});
	});
});