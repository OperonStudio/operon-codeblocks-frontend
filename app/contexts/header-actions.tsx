import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type ActionHandler = () => void;

interface HeaderActionContextValue {
  handlers: Record<string, ActionHandler>;
  register: (actions: Record<string, ActionHandler>) => void;
  unregister: (actionIds: string[]) => void;
}

const HeaderActionContext = createContext<HeaderActionContextValue | null>(
  null,
);

export const HeaderActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [handlers, setHandlers] = useState<Record<string, ActionHandler>>({});

  const register = (actions: Record<string, ActionHandler>) => {
    setHandlers((prev) => ({ ...prev, ...actions }));
  };

  const unregister = (actionIds: string[]) => {
    setHandlers((prev) => {
      const next = { ...prev };
      actionIds.forEach((id) => {
        delete next[id];
      });
      return next;
    });
  };

  return (
    <HeaderActionContext.Provider value={{ handlers, register, unregister }}>
      {children}
    </HeaderActionContext.Provider>
  );
};

/**
 * Hook for page components to register their header actions.
 * Automatically handles registration on mount and cleanup on unmount.
 * Prevents stale closures by maintaining a ref to the latest handlers.
 * Keep this or change the logic if u want
 */
export const useHeaderActions = (actions: Record<string, ActionHandler>) => {
  const context = useContext(HeaderActionContext);
  if (!context) {
    throw new Error(
      "useHeaderActions must be used within a HeaderActionProvider",
    );
  }

  const actionsRef = useRef(actions);

  useEffect(() => {
    actionsRef.current = actions;
  }, [actions]);

  useEffect(() => {
    const proxyActions: Record<string, ActionHandler> = {};
    const actionIds = Object.keys(actionsRef.current);
    actionIds.forEach((id) => {
      proxyActions[id] = () => {
        actionsRef.current[id]?.();
      };
    });

    context.register(proxyActions);

    return () => {
      context.unregister(actionIds);
    };
  }, []);
};

export const useHeaderActionHandler = (
  actionId: string,
): ActionHandler | undefined => {
  const context = useContext(HeaderActionContext);
  if (!context) {
    throw new Error(
      "useHeaderActionHandler must be used within a HeaderActionProvider",
    );
  }
  return context.handlers[actionId];
};
