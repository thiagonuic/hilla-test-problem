import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HelloWorldView from "Frontend/views/helloworld/HelloWorldView";
import { userEvent } from "@testing-library/user-event";
import {HelloWorldService} from "Frontend/generated/endpoints";

describe("TodoView", () => {
    let addTodoSpy: MockInstance;

    beforeEach(() => {
        addTodoSpy = vi.spyOn(HelloWorldService, "sayHello");
        addTodoSpy.mockReturnValue(Promise.resolve("Hello, My name!"));
    });

    afterEach(() => {
        addTodoSpy.mockRestore();
    });

    it("should render", async () => {
        render(<HelloWorldView />);
        expect(screen.getByText("Your name")).to.exist;

        const textField = screen.getByLabelText("Your name");
        await userEvent.click(textField);
        await userEvent.type(textField, "My name");

        const button = screen.getByText("Say hello");
        await userEvent.click(button);
    });
});