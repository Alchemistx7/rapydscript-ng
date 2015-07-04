var AST_Token, AST_Node, AST_Statement, AST_Debugger, AST_Directive, AST_SimpleStatement, AST_Block, AST_BlockStatement, AST_EmptyStatement, AST_StatementWithBody, AST_LabeledStatement, AST_DWLoop, AST_Do, AST_While, AST_ForIn, AST_ForJS, AST_ListComprehension, AST_With, AST_Scope, AST_Toplevel, AST_Import, AST_Imports, AST_Decorator, AST_Lambda, AST_Accessor, AST_Function, AST_Class, AST_Method, AST_Jump, AST_Exit, AST_Return, AST_Throw, AST_LoopControl, AST_Break, AST_Continue, AST_If, AST_Switch, AST_SwitchBranch, AST_Default, AST_Case, AST_Try, AST_Catch, AST_Except, AST_Finally, AST_Definitions, AST_Var, AST_Const, AST_VarDef, AST_BaseCall, AST_Call, AST_ClassCall, AST_New, AST_Seq, AST_PropAccess, AST_Dot, AST_Sub, AST_Splice, AST_Unary, AST_UnaryPrefix, AST_UnaryPostfix, AST_Binary, AST_Conditional, AST_Assign, AST_Array, AST_Object, AST_ObjectProperty, AST_ObjectKeyVal, AST_ObjectSetter, AST_ObjectGetter, AST_Symbol, AST_SymbolAlias, AST_SymbolAccessor, AST_SymbolDeclaration, AST_SymbolVar, AST_ImportedVar, AST_SymbolConst, AST_SymbolNonlocal, AST_SymbolFunarg, AST_SymbolDefun, AST_SymbolLambda, AST_SymbolCatch, AST_Label, AST_SymbolRef, AST_LabelRef, AST_This, AST_Constant, AST_String, AST_Verbatim, AST_Number, AST_RegExp, AST_Atom, AST_Null, AST_NaN, AST_Undefined, AST_Hole, AST_Infinity, AST_Boolean, AST_False, AST_True;
"use strict";
function DEFNODE(type, props, methods, base) {
    var self_props, proto, code, ctor, i;
    if (arguments.length < 4) {
        base = AST_Node;
    }
    if (!props) {
        props = [];
    } else {
        props = props.split(/\s+/);
    }
    self_props = props;
    if (base && base.PROPS) {
        props = props.concat(base.PROPS);
    }
    code = "return function AST_" + type + "(props){ if (props) { ";
    for (i = props.length - 1; i > -1; i-=1) {
        code += "this." + props[i] + " = props." + props[i] + ";";
    }
    proto = base && new base();
    if (proto && proto.initialize || methods && methods.initialize) {
        code += "this.initialize();";
    }
    code += "}}";
    ctor = new Function(code)();
    if (proto) {
        ctor.prototype = proto;
        ctor.BASE = base;
    }
    if (base) {
        base.SUBCLASSES.push(ctor);
    }
    ctor.prototype.CTOR = ctor;
    ctor.PROPS = props || null;
    ctor.SELF_PROPS = self_props;
    ctor.SUBCLASSES = [];
    if (type) {
        ctor.prototype.TYPE = ctor.TYPE = type;
    }
    if (methods) {
        for (i in methods) {
            if (methods.hasOwnProperty(i)) {
                if (/^\$/.test(i)) {
                    ctor[i.substr(1)] = methods[i];
                } else {
                    ctor.prototype[i] = methods[i];
                }
            }
        }
    }
    ctor.DEFMETHOD = function(name, method) {
        this.prototype[name] = method;
    };
    return ctor;
}
AST_Token = DEFNODE("Token", "type value line col pos endpos nlb comments_before file", {}, null);
AST_Node = DEFNODE("Node", "start end", {
    clone: function() {
        return new this.CTOR(this);
    },
    $documentation: "Base class of all AST nodes",
    $propdoc: {
        start: "[AST_Token] The first token of this node",
        end: "[AST_Token] The last token of this node"
    },
    _walk: function(visitor) {
        return visitor._visit(this);
    },
    walk: function(visitor) {
        return this._walk(visitor);
    }
}, null);
AST_Node.warn_function = null;
AST_Node.warn = function(txt, props) {
    if (AST_Node.warn_function) {
        AST_Node.warn_function(string_template(txt, props));
    }
};
AST_Statement = DEFNODE("Statement", null, {
    $documentation: "Base class of all statements"
});
AST_Debugger = DEFNODE("Debugger", null, {
    $documentation: "Represents a debugger statement"
}, AST_Statement);
AST_Directive = DEFNODE("Directive", "value scope", {
    $documentation: "Represents a directive, like \"use strict\";",
    $propdoc: {
        value: "[string] The value of this directive as a plain string (it's not an AST_String!)",
        scope: "[AST_Scope/S] The scope that this directive affects"
    }
}, AST_Statement);
AST_SimpleStatement = DEFNODE("SimpleStatement", "body", {
    $documentation: "A statement consisting of an expression, i.e. a = 1 + 2",
    $propdoc: {
        body: "[AST_Node] an expression node (should not be instanceof AST_Statement)"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.body._walk(visitor);
        });
    }
}, AST_Statement);
function walk_body(node, visitor) {
    if (node.body instanceof AST_Statement) {
        node.body._walk(visitor);
    } else if (node.body) {
        node.body.forEach(function(stat) {
            stat._walk(visitor);
        });
    }
}
AST_Block = DEFNODE("Block", "body", {
    $documentation: "A body of statements (usually bracketed)",
    $propdoc: {
        body: "[AST_Statement*] an array of statements"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(this, function() {
            walk_body(node, visitor);
        });
    }
}, AST_Statement);
AST_BlockStatement = DEFNODE("BlockStatement", null, {
    $documentation: "A block statement"
}, AST_Block);
AST_EmptyStatement = DEFNODE("EmptyStatement", "stype", {
    $documentation: "The empty statement (empty block or simply a semicolon)",
    $propdoc: {
        stype: "[string] the type of empty statement. Is ; for semicolons"
    },
    _walk: function(visitor) {
        return visitor._visit(this);
    }
}, AST_Statement);
AST_StatementWithBody = DEFNODE("StatementWithBody", "body", {
    $documentation: "Base class for all statements that contain one nested body: `For`, `ForIn`, `Do`, `While`, `With`",
    $propdoc: {
        body: "[AST_Statement] the body; this should always be present, even if it's an AST_EmptyStatement"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.body._walk(visitor);
        });
    }
}, AST_Statement);
AST_LabeledStatement = DEFNODE("LabeledStatement", "label", {
    $documentation: "Statement with a label",
    $propdoc: {
        label: "[AST_Label] a label definition"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.label._walk(visitor);
            node.body._walk(visitor);
        });
    }
}, AST_StatementWithBody);
AST_DWLoop = DEFNODE("DWLoop", "condition", {
    $documentation: "Base class for do/while statements",
    $propdoc: {
        condition: "[AST_Node] the loop condition.  Should not be instanceof AST_Statement"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.condition._walk(visitor);
            node.body._walk(visitor);
        });
    }
}, AST_StatementWithBody);
AST_Do = DEFNODE("Do", null, {
    $documentation: "A `do` statement"
}, AST_DWLoop);
AST_While = DEFNODE("While", null, {
    $documentation: "A `while` statement"
}, AST_DWLoop);
AST_ForIn = DEFNODE("ForIn", "init name object", {
    $documentation: "A `for ... in` statement",
    $propdoc: {
        init: "[AST_Node] the `for/in` initialization code",
        name: "[AST_SymbolRef?] the loop variable, only if `init` is AST_Var",
        object: "[AST_Node] the object that we're looping through"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.init._walk(visitor);
            if (node.name) node.name._walk(visitor);
            node.object._walk(visitor);
            if (node.body) {
                node.body._walk(visitor);
            }
        });
    }
}, AST_StatementWithBody);
AST_ForJS = DEFNODE("ForJS", "condition", {
    $documentation: "A `for ... in` statement",
    $propdoc: {
        condition: "[AST_Verbatim] raw JavaScript conditional"
    }
}, AST_StatementWithBody);
AST_ListComprehension = DEFNODE("ListComprehension", "condition statement", {
    $documentation: "A list comprehension expression",
    $propdoc: {
        condition: "[AST_Node] the `if` condition",
        statement: "[AST_Node] statement to perform on each element before returning it"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.init._walk(visitor);
            if (node.condition) node.condition._walk(visitor);
            node.statement._walk(visitor);
        });
    }
}, AST_ForIn);
AST_With = DEFNODE("With", "expression", {
    $documentation: "A `with` statement",
    $propdoc: {
        expression: "[AST_Node] the `with` expression"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
            node.body._walk(visitor);
        });
    }
}, AST_StatementWithBody);
AST_Scope = DEFNODE("Scope", "directives variables localvars functions uses_with uses_eval parent_scope enclosed cname", {
    $documentation: "Base class for all statements introducing a lexical scope",
    $propdoc: {
        directives: "[string*/S] an array of directives declared in this scope",
        variables: "[Object/S] a map of name -> SymbolDef for all variables/functions defined in this scope",
        localvars: "[SymbolDef*] list of variables local to this scope",
        functions: "[Object/S] like `variables`, but only lists function declarations",
        uses_with: "[boolean/S] tells whether this scope uses the `with` statement",
        uses_eval: "[boolean/S] tells whether this scope contains a direct call to the global `eval`",
        parent_scope: "[AST_Scope?/S] link to the parent scope",
        enclosed: "[SymbolDef*/S] a list of all symbol definitions that are accessed from this scope or any subscopes",
        cname: "[integer/S] current index for mangling variables (used internally by the mangler)"
    }
}, AST_Block);
AST_Toplevel = DEFNODE("Toplevel", "globals baselib imports imported_module_ids strict shebang import_order module_id exports submodules classes filename srchash", {
    $documentation: "The toplevel scope",
    $propdoc: {
        globals: "[Object/S] a map of name -> SymbolDef for all undeclared names",
        baselib: "[Object/s] a collection of used parts of baselib",
        imports: "[Object/S] a map of module_id->AST_Toplevel for all imported modules (this represents all imported modules across all source files)",
        imported_module_ids: "[string*] a list of module ids that were imported by this module, specifically",
        nonlocalvars: "[String*] a list of all non-local variable names (names that come from the global scope)",
        strict: "[boolean/S] true if strict directive is in scope",
        shebang: "[string] If #! line is present, it will be stored here",
        import_order: "[number] The global order in which this scope was imported",
        module_id: "[string] The id of this module",
        exports: "[SymbolDef*] list of names exported from this module",
        submodules: "[string*] list of names exported from this module",
        classes: "[Object/S] a map of class names to AST_Class for classes defined in this module",
        filename: "[string] The absolute path to the file from which this module was read",
        srchash: "[string] SHA1 hash of source code, used for caching"
    }
}, AST_Scope);
AST_Import = DEFNODE("Import", "module key alias argnames body", {
    $documentation: "Container for a single import",
    $propdoc: {
        module: "[AST_SymbolVar] name of the module we're importing",
        key: "[string] The key by which this module is stored in the global modules mapping",
        alias: "[AST_SymbolAlias] The name this module is imported as, can be None. For import x as y statements.",
        argnames: "[AST_ImportedVar*] names of objects to be imported",
        body: "[AST_TopLevel] parsed contents of the imported file"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            if (node.alias) {
                node.alias._walk(visitor);
            }
            if (node.argnames) {
                node.argnames.forEach(function(arg) {
                    arg._walk(visitor);
                });
            }
        });
    }
}, AST_Statement);
AST_Imports = DEFNODE("Imports", "imports", {
    $documentation: "Container for a single import",
    $propdoc: {
        "imports": "[AST_Import+] array of imports"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.imports.forEach(function(imp) {
                imp._walk(visitor);
            });
        });
    }
}, AST_Statement);
AST_Decorator = DEFNODE("Decorator", "name", {
    $documentation: "Class for function decorators",
    $propdoc: {
        name: "[string] decorator name"
    }
});
AST_Lambda = DEFNODE("Lambda", "name argnames uses_arguments decorators", {
    $documentation: "Base class for functions",
    $propdoc: {
        name: "[AST_SymbolDeclaration?] the name of this function",
        argnames: "[AST_SymbolFunarg*] array of function arguments",
        uses_arguments: "[boolean/S] tells whether this function accesses the arguments array",
        decorators: "[AST_Decorator*] function decorators, if any"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            var d;
            if (node.decorators) {
                var _$rapyd$_Iter2 = _$rapyd$_Iterable(node.decorators);
                for (var _$rapyd$_Index2 = 0; _$rapyd$_Index2 < _$rapyd$_Iter2.length; _$rapyd$_Index2++) {
                    d = _$rapyd$_Iter2[_$rapyd$_Index2];
                    d.walk(visitor);
                }
            }
            if (node.name) {
                node.name._walk(visitor);
            }
            node.argnames.forEach(function(arg) {
                arg._walk(visitor);
            });
            if (node.argnames.starargs) {
                node.argnames.starargs._walk(visitor);
            }
            if (node.argnames.kwargs) {
                node.argnames.kwargs._walk(visitor);
            }
            walk_body(node, visitor);
        });
    }
}, AST_Scope);
AST_Accessor = DEFNODE("Accessor", null, {
    $documentation: "A setter/getter function"
}, AST_Lambda);
AST_Function = DEFNODE("Function", null, {
    $documentation: "A function expression"
}, AST_Lambda);
AST_Class = DEFNODE("Class", "init name parent static external bound decorators module_id", {
    $documentation: "A class declaration",
    $propdoc: {
        name: "[AST_SymbolDeclaration?] the name of this class",
        init: "[AST_Function] constructor for the class",
        parent: "[AST_Class?] parent class this class inherits from",
        "static": "[string*] list of static methods",
        external: "[boolean] true if class is declared elsewhere, but will be within current scope at runtime",
        bound: "[string*] list of methods that need to be bound to behave correctly (function pointers)",
        decorators: "[AST_Decorator*] function decorators, if any",
        module_id: "[string] The id of the module this class is defined in"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            var d;
            if (node.decorators) {
                var _$rapyd$_Iter3 = _$rapyd$_Iterable(node.decorators);
                for (var _$rapyd$_Index3 = 0; _$rapyd$_Index3 < _$rapyd$_Iter3.length; _$rapyd$_Index3++) {
                    d = _$rapyd$_Iter3[_$rapyd$_Index3];
                    d.walk(visitor);
                }
            }
            node.name._walk(visitor);
            walk_body(this, visitor);
            if (node.parent) node.parent._walk(visitor);
        });
    }
}, AST_Scope);
AST_Method = DEFNODE("Defun", "static", {
    $documentation: "A class method definition",
    $propdoc: {
        "static": "[boolean] true if method is static"
    }
}, AST_Lambda);
AST_Jump = DEFNODE("Jump", null, {
    $documentation: "Base class for “jumps” (for now that's `return`, `throw`, `break` and `continue`)"
}, AST_Statement);
AST_Exit = DEFNODE("Exit", "value", {
    $documentation: "Base class for “exits” (`return` and `throw`)",
    $propdoc: {
        value: "[AST_Node?] the value returned or thrown by this statement; could be null for AST_Return"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            if (node.value) {
                node.value._walk(visitor);
            }
        });
    }
}, AST_Jump);
AST_Return = DEFNODE("Return", null, {
    $documentation: "A `return` statement"
}, AST_Exit);
AST_Throw = DEFNODE("Throw", null, {
    $documentation: "A `throw` statement"
}, AST_Exit);
AST_LoopControl = DEFNODE("LoopControl", "label", {
    $documentation: "Base class for loop control statements (`break` and `continue`)",
    $propdoc: {
        label: "[AST_LabelRef?] the label, or null if none"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            if (node.label) {
                node.label._walk(visitor);
            }
        });
    }
}, AST_Jump);
AST_Break = DEFNODE("Break", null, {
    $documentation: "A `break` statement"
}, AST_LoopControl);
AST_Continue = DEFNODE("Continue", null, {
    $documentation: "A `continue` statement"
}, AST_LoopControl);
AST_If = DEFNODE("If", "condition alternative", {
    $documentation: "A `if` statement",
    $propdoc: {
        condition: "[AST_Node] the `if` condition",
        alternative: "[AST_Statement?] the `else` part, or null if not present"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.condition._walk(visitor);
            node.body._walk(visitor);
            if (node.alternative) {
                node.alternative._walk(visitor);
            }
        });
    }
}, AST_StatementWithBody);
AST_Switch = DEFNODE("Switch", "expression", {
    $documentation: "A `switch` statement",
    $propdoc: {
        expression: "[AST_Node] the `switch` “discriminant”"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
            walk_body(node, visitor);
        });
    }
}, AST_Block);
AST_SwitchBranch = DEFNODE("SwitchBranch", null, {
    $documentation: "Base class for `switch` branches"
}, AST_Block);
AST_Default = DEFNODE("Default", null, {
    $documentation: "A `default` switch branch"
}, AST_SwitchBranch);
AST_Case = DEFNODE("Case", "expression", {
    $documentation: "A `case` switch branch",
    $propdoc: {
        expression: "[AST_Node] the `case` expression"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
            walk_body(node, visitor);
        });
    }
}, AST_SwitchBranch);
AST_Try = DEFNODE("Try", "bcatch bfinally", {
    $documentation: "A `try` statement",
    $propdoc: {
        bcatch: "[AST_Catch?] the catch block, or null if not present",
        bfinally: "[AST_Finally?] the finally block, or null if not present"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            walk_body(node, visitor);
            if (node.bcatch) {
                node.bcatch._walk(visitor);
            }
            if (node.bfinally) {
                node.bfinally._walk(visitor);
            }
        });
    }
}, AST_Block);
AST_Catch = DEFNODE("Catch", null, {
    $documentation: "A `catch` node; only makes sense as part of a `try` statement",
    $propdoc: {}
}, AST_Block);
AST_Except = DEFNODE("Except", "argname errors", {
    $documentation: "An `except` node for RapydScript, which resides inside the catch block",
    $propdoc: {
        argname: "[AST_SymbolCatch] symbol for the exception",
        errors: "[AST_SymbolVar*] error classes to catch in this block"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(this, function() {
            var e;
            if (node.argname) {
                node.argname.walk(visitor);
            }
            if (node.errors) {
                var _$rapyd$_Iter4 = _$rapyd$_Iterable(node.errors);
                for (var _$rapyd$_Index4 = 0; _$rapyd$_Index4 < _$rapyd$_Iter4.length; _$rapyd$_Index4++) {
                    e = _$rapyd$_Iter4[_$rapyd$_Index4];
                    e.walk(visitor);
                }
            }
            walk_body(node, visitor);
        });
    }
}, AST_Block);
AST_Finally = DEFNODE("Finally", null, {
    $documentation: "A `finally` node; only makes sense as part of a `try` statement"
}, AST_Block);
AST_Definitions = DEFNODE("Definitions", "definitions", {
    $documentation: "Base class for `var` or `const` nodes (variable declarations/initializations)",
    $propdoc: {
        definitions: "[AST_VarDef*] array of variable definitions"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.definitions.forEach(function(def_) {
                def_._walk(visitor);
            });
        });
    }
}, AST_Statement);
AST_Var = DEFNODE("Var", null, {
    $documentation: "A `var` statement"
}, AST_Definitions);
AST_Const = DEFNODE("Const", null, {
    $documentation: "A `const` statement"
}, AST_Definitions);
AST_VarDef = DEFNODE("VarDef", "name value", {
    $documentation: "A variable declaration; only appears in a AST_Definitions node",
    $propdoc: {
        name: "[AST_SymbolVar|AST_SymbolConst|AST_SymbolNonlocal] name of the variable",
        value: "[AST_Node?] initializer, or null if there's no initializer"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.name._walk(visitor);
            if (node.value) {
                node.value._walk(visitor);
            }
        });
    }
});
AST_BaseCall = DEFNODE("BaseCall", "args", {
    $documentation: "A base class for function calls",
    $propdoc: {
        args: "[AST_Node*] array of arguments"
    }
});
AST_Call = DEFNODE("Call", "expression", {
    $documentation: "A function call expression",
    $propdoc: {
        expression: "[AST_Node] expression to invoke as function"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
            node.args.forEach(function(arg) {
                arg._walk(visitor);
            });
        });
    }
}, AST_BaseCall);
AST_ClassCall = DEFNODE("ClassCall", "class method static", {
    $documentation: "A function call expression",
    $propdoc: {
        "class": "[string] name of the class method belongs to",
        method: "[string] class method being called",
        "static": "[boolean] defines whether the method is static"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            if (node.expression) node.expression._walk(visitor);
            node.args.forEach(function(arg) {
                arg._walk(visitor);
            });
        });
    }
}, AST_BaseCall);
AST_New = DEFNODE("New", null, {
    $documentation: "An object instantiation. Derives from a function call since it has exactly the same properties"
}, AST_Call);
AST_Seq = DEFNODE("Seq", "car cdr", {
    $documentation: "A sequence expression (two comma-separated expressions)",
    $propdoc: {
        car: "[AST_Node] first element in sequence",
        cdr: "[AST_Node] second element in sequence"
    },
    $cons: function(x, y) {
        var seq;
        seq = new AST_Seq(x);
        seq.car = x;
        seq.cdr = y;
        return seq;
    },
    $from_array: function(array) {
        var list, i, p;
        if (array.length === 0) {
            return null;
        }
        if (array.length === 1) {
            return array[0].clone();
        }
        list = null;
        for (i = array.length - 1; i > -1; i-=1) {
            list = AST_Seq.cons(array[i], list);
        }
        p = list;
        while (p) {
            if (p.cdr && !p.cdr.cdr) {
                p.cdr = p.cdr.car;
                break;
            }
            p = p.cdr;
        }
        return list;
    },
    to_array: function() {
        var a, p;
        p = this;
        a = [];
        while (p) {
            a.push(p.car);
            if (p.cdr && !(p.cdr instanceof AST_Seq)) {
                a.push(p.cdr);
                break;
            }
            p = p.cdr;
        }
        return a;
    },
    add: function(node) {
        var cell, p;
        p = this;
        while (p) {
            if (!(p.cdr instanceof AST_Seq)) {
                cell = AST_Seq.cons(p.cdr, node);
                return p.cdr = cell;
            }
            p = p.cdr;
        }
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.car._walk(visitor);
            if (node.cdr) {
                node.cdr._walk(visitor);
            }
        });
    }
});
AST_PropAccess = DEFNODE("PropAccess", "expression property", {
    $documentation: "Base class for property access expressions, i.e. `a.foo` or `a[\"foo\"]`",
    $propdoc: {
        expression: "[AST_Node] the “container” expression",
        property: "[AST_Node|string] the property to access.  For AST_Dot this is always a plain string, while for AST_Sub it's an arbitrary AST_Node"
    }
});
AST_Dot = DEFNODE("Dot", null, {
    $documentation: "A dotted property access expression",
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
        });
    }
}, AST_PropAccess);
AST_Sub = DEFNODE("Sub", null, {
    $documentation: "Index-style property access, i.e. `a[\"foo\"]`",
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
            node.property._walk(visitor);
        });
    }
}, AST_PropAccess);
AST_Splice = DEFNODE("Slice", "property2 assignment", {
    $documentation: "Index-style property access, i.e. `a[3:5]`",
    $propdoc: {
        property2: "[AST_Node] the 2nd property to access - typically ending index for the array.",
        assignment: "[AST_Node] The data being spliced in."
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
            node.property._walk(visitor);
            node.property2._walk(visitor);
        });
    }
}, AST_PropAccess);
AST_Unary = DEFNODE("Unary", "operator expression", {
    $documentation: "Base class for unary expressions",
    $propdoc: {
        operator: "[string] the operator",
        expression: "[AST_Node] expression that this unary operator applies to"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.expression._walk(visitor);
        });
    }
});
AST_UnaryPrefix = DEFNODE("UnaryPrefix", null, {
    $documentation: "Unary prefix expression, i.e. `typeof i` or `++i`"
}, AST_Unary);
AST_UnaryPostfix = DEFNODE("UnaryPostfix", null, {
    $documentation: "Unary postfix expression, i.e. `i++`"
}, AST_Unary);
AST_Binary = DEFNODE("Binary", "left operator right", {
    $documentation: "Binary expression, i.e. `a + b`",
    $propdoc: {
        left: "[AST_Node] left-hand side expression",
        operator: "[string] the operator",
        right: "[AST_Node] right-hand side expression"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.left._walk(visitor);
            node.right._walk(visitor);
        });
    }
});
AST_Conditional = DEFNODE("Conditional", "condition consequent alternative", {
    $documentation: "Conditional expression using the ternary operator, i.e. `a ? b : c`",
    $propdoc: {
        condition: "[AST_Node]",
        consequent: "[AST_Node]",
        alternative: "[AST_Node]"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.condition._walk(visitor);
            node.consequent._walk(visitor);
            node.alternative._walk(visitor);
        });
    }
});
AST_Assign = DEFNODE("Assign", null, {
    $documentation: "An assignment expression — `a = b + 5`"
}, AST_Binary);
AST_Array = DEFNODE("Array", "elements", {
    $documentation: "An array literal",
    $propdoc: {
        elements: "[AST_Node*] array of elements"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.elements.forEach(function(el) {
                el._walk(visitor);
            });
        });
    }
});
AST_Object = DEFNODE("Object", "properties", {
    $documentation: "An object literal",
    $propdoc: {
        properties: "[AST_ObjectProperty*] array of properties"
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.properties.forEach(function(prop) {
                prop._walk(visitor);
            });
        });
    }
});
AST_ObjectProperty = DEFNODE("ObjectProperty", "key value quoted", {
    $documentation: "Base class for literal object properties",
    $propdoc: {
        key: "[string] the property name; it's always a plain string in our AST, no matter if it was a string, number or identifier in original code",
        value: "[AST_Node] property value.  For setters and getters this is an AST_Function.",
        quoted: "[true/false] keeps track whether the property was quoted in original code."
    },
    _walk: function(visitor) {
        var node;
        node = this;
        return visitor._visit(node, function() {
            node.value._walk(visitor);
        });
    }
});
AST_ObjectKeyVal = DEFNODE("ObjectKeyVal", null, {
    $documentation: "A key: value object property"
}, AST_ObjectProperty);
AST_ObjectSetter = DEFNODE("ObjectSetter", null, {
    $documentation: "An object setter property"
}, AST_ObjectProperty);
AST_ObjectGetter = DEFNODE("ObjectGetter", null, {
    $documentation: "An object getter property"
}, AST_ObjectProperty);
AST_Symbol = DEFNODE("Symbol", "scope name thedef", {
    $propdoc: {
        name: "[string] name of this symbol",
        scope: "[AST_Scope/S] the current scope (not necessarily the definition scope)",
        thedef: "[SymbolDef/S] the definition of this symbol"
    },
    $documentation: "Base class for all symbols"
});
AST_SymbolAlias = DEFNODE("SymbolAlias", null, {
    $documentation: "An alias used in an import statement"
}, AST_Symbol);
AST_SymbolAccessor = DEFNODE("SymbolAccessor", null, {
    $documentation: "The name of a property accessor (setter/getter function)"
}, AST_Symbol);
AST_SymbolDeclaration = DEFNODE("SymbolDeclaration", "init", {
    $documentation: "A declaration symbol (symbol in var/const, function name or argument, symbol in catch)",
    $propdoc: {
        init: "[AST_Node*/S] array of initializers for this declaration."
    }
}, AST_Symbol);
AST_SymbolVar = DEFNODE("SymbolVar", null, {
    $documentation: "Symbol defining a variable"
}, AST_SymbolDeclaration);
AST_ImportedVar = DEFNODE("ImportedVar", "alias", {
    $documentation: "Symbol defining an imported symbol",
    $propdoc: {
        alias: "AST_SymbolAlias the alias for this imported symbol"
    }
}, AST_SymbolVar);
AST_SymbolConst = DEFNODE("SymbolConst", null, {
    $documentation: "A constant declaration"
}, AST_SymbolDeclaration);
AST_SymbolNonlocal = DEFNODE("SymbolNonlocal", null, {
    $documentation: "A nonlocal declaration"
}, AST_SymbolDeclaration);
AST_SymbolFunarg = DEFNODE("SymbolFunarg", null, {
    $documentation: "Symbol naming a function argument"
}, AST_SymbolVar);
AST_SymbolDefun = DEFNODE("SymbolDefun", null, {
    $documentation: "Symbol defining a function"
}, AST_SymbolDeclaration);
AST_SymbolLambda = DEFNODE("SymbolLambda", null, {
    $documentation: "Symbol naming a function expression"
}, AST_SymbolDeclaration);
AST_SymbolCatch = DEFNODE("SymbolCatch", null, {
    $documentation: "Symbol naming the exception in catch"
}, AST_SymbolDeclaration);
AST_Label = DEFNODE("Label", "references", {
    $documentation: "Symbol naming a label (declaration)",
    $propdoc: {
        references: "[AST_LabelRef*] a list of nodes referring to this label"
    }
}, AST_Symbol);
AST_SymbolRef = DEFNODE("SymbolRef", "parens", {
    $documentation: "Reference to some symbol (not definition/declaration)",
    $propdoc: {
        parens: "[boolean/S] if true, this variable is wrapped in parentheses"
    }
}, AST_Symbol);
AST_LabelRef = DEFNODE("LabelRef", null, {
    $documentation: "Reference to a label symbol"
}, AST_Symbol);
AST_This = DEFNODE("This", null, {
    $documentation: "The `this` symbol"
}, AST_Symbol);
AST_Constant = DEFNODE("Constant", null, {
    $documentation: "Base class for all constants",
    getValue: function() {
        return this.value;
    }
});
AST_String = DEFNODE("String", "value", {
    $documentation: "A string literal",
    $propdoc: {
        value: "[string] the contents of this string"
    }
}, AST_Constant);
AST_Verbatim = DEFNODE("Verbatim", "value", {
    $documentation: "Raw JavaScript code",
    $propdoc: {
        value: "[string] A string of raw JS code"
    }
}, AST_Constant);
AST_Number = DEFNODE("Number", "value", {
    $documentation: "A number literal",
    $propdoc: {
        value: "[number] the numeric value"
    }
}, AST_Constant);
AST_RegExp = DEFNODE("RegExp", "value", {
    $documentation: "A regexp literal",
    $propdoc: {
        value: "[RegExp] the actual regexp"
    }
}, AST_Constant);
AST_Atom = DEFNODE("Atom", null, {
    $documentation: "Base class for atoms"
}, AST_Constant);
AST_Null = DEFNODE("Null", null, {
    $documentation: "The `null` atom",
    value: null
}, AST_Atom);
AST_NaN = DEFNODE("NaN", null, {
    $documentation: "The impossible value",
    value: 0 / 0
}, AST_Atom);
AST_Undefined = DEFNODE("Undefined", null, {
    $documentation: "The `undefined` value",
    value: function() {
    }.call(this)
}, AST_Atom);
AST_Hole = DEFNODE("Hole", null, {
    $documentation: "A hole in an array",
    value: function() {
    }.call(this)
}, AST_Atom);
AST_Infinity = DEFNODE("Infinity", null, {
    $documentation: "The `Infinity` value",
    value: 1 / 0
}, AST_Atom);
AST_Boolean = DEFNODE("Boolean", null, {
    $documentation: "Base class for booleans"
}, AST_Atom);
AST_False = DEFNODE("False", null, {
    $documentation: "The `false` atom",
    value: false
}, AST_Boolean);
AST_True = DEFNODE("True", null, {
    $documentation: "The `true` atom",
    value: true
}, AST_Boolean);
function TreeWalker(callback) {
    this.visit = callback;
    this.stack = [];
}
TreeWalker.prototype = {
    _visit: function(node, descend) {
        var ret;
        this.stack.push(node);
        ret = this.visit(node, descend ? function() {
            descend.call(node);
        } : noop);
        if (!ret && descend) {
            descend.call(node);
        }
        this.stack.pop();
        return ret;
    },
    parent: function(n) {
        return this.stack[this.stack.length - 2 - (n || 0)];
    },
    push: function(node) {
        this.stack.push(node);
    },
    pop: function() {
        return this.stack.pop();
    },
    self: function() {
        return this.stack[this.stack.length - 1];
    },
    find_parent: function(type) {
        var stack, x, i;
        stack = this.stack;
        for (i = stack.length - 1; i > -1; i-=1) {
            x = stack[i];
            if (x instanceof type) {
                return x;
            }
        }
    },
    in_boolean_context: function() {
        var stack, i, p, self;
        stack = this.stack;
        i = stack.length;
        self = stack[i -= 1];
        while (i > 0) {
            p = stack[i -= 1];
            if (p instanceof AST_If && p.condition === self || p instanceof AST_Conditional && p.condition === self || p instanceof AST_DWLoop && p.condition === self || p instanceof AST_UnaryPrefix && p.operator === "!" && p.expression === self) {
                return true;
            }
            if (!(p instanceof AST_Binary && (p.operator === "&&" || p.operator === "||"))) {
                return false;
            }
            self = p;
        }
    },
    loopcontrol_target: function(label) {
        var stack, x, i;
        stack = this.stack;
        if (label) {
            for (i = stack.length - 1; i > -1; i-=1) {
                x = stack[i];
                if (x instanceof AST_LabeledStatement && x.label.name === label.name) {
                    return x.body;
                }
            }
        } else {
            for (i = stack.length - 1; i > -1; i-=1) {
                x = stack[i];
                if (x instanceof AST_Switch || x instanceof AST_ForIn || x instanceof AST_DWLoop) {
                    return x;
                }
            }
        }
    }
};