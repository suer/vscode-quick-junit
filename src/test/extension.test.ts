import * as assert from 'assert';
import { toggleFileName, extractPackage } from '../logic';

suite('toggleFileName', () => {
	test('converts a production file name to its test file name', () => {
		assert.strictEqual(toggleFileName('Foo.java'), 'FooTest.java');
	});

	test('converts a test file name back to its production file name', () => {
		assert.strictEqual(toggleFileName('FooTest.java'), 'Foo.java');
	});

	test('leaves non-.java file names unchanged', () => {
		assert.strictEqual(toggleFileName('Foo.txt'), 'Foo.txt');
	});
});

suite('extractPackage', () => {
	test('extracts the package name from a source file', () => {
		const source = 'package com.example.app;\n\npublic class Foo {}\n';
		assert.strictEqual(extractPackage(source), 'com.example.app');
	});

	test('returns an empty string when there is no package declaration', () => {
		const source = 'public class Foo {}\n';
		assert.strictEqual(extractPackage(source), '');
	});
});
